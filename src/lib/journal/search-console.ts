import crypto from "node:crypto";

/**
 * Minimal Google Search Console client — no googleapis dependency, just the
 * JWT-bearer service-account flow (sign a claim set with the service
 * account's private key, exchange it for an access token, call the REST
 * API directly). Returns [] whenever credentials are missing or the API
 * call fails, so a slow/broken integration here never blocks the daily
 * journal post — it only makes the topic choice smarter when data exists.
 */

const SITE_URL = process.env.SEARCH_CONSOLE_SITE_URL || "sc-domain:naireva.com";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
  token_uri: string;
}

function loadServiceAccount(): ServiceAccountKey | null {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!b64) return null;
  try {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  } catch {
    console.error("GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 is not valid base64-encoded JSON.");
    return null;
  }
}

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken(account: ServiceAccountKey): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: account.client_email,
      scope: SCOPE,
      aud: account.token_uri,
      exp: now + 3600,
      iat: now
    })
  );
  const signature = base64url(crypto.sign("RSA-SHA256", Buffer.from(`${header}.${claims}`), account.private_key));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(account.token_uri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token as string;
}

export interface TopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/** Top search queries for the last 28 days, ranked by impressions. Empty if unconfigured or no data yet. */
export async function getTopSearchQueries(rowLimit = 20): Promise<TopQuery[]> {
  const account = loadServiceAccount();
  if (!account) return [];

  try {
    const token = await getAccessToken(account);
    const end = new Date();
    const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({
          startDate: fmt(start),
          endDate: fmt(end),
          dimensions: ["query"],
          rowLimit
        })
      }
    );

    if (!res.ok) {
      console.error("Search Console API error", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    const rows = (data.rows as Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>) ?? [];
    return rows.map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position
    }));
  } catch (err) {
    console.error("Failed to fetch Search Console data", err);
    return [];
  }
}
