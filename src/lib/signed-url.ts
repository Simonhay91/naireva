import crypto from "node:crypto";

/**
 * HMAC-signed, time-limited tokens for the local storage driver's file-serving
 * route. Stands in for the signed URLs an S3/R2 bucket would issue, so admin
 * file access is never a bare, guessable public path even in local dev.
 */
// Checked lazily (not at module load) so `next build`'s static page-data
// collection — which imports this module with NODE_ENV=production but no
// real env vars loaded yet — doesn't crash the build itself.
function getSecret() {
  if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("NEXTAUTH_SECRET must be set in production — refusing to start with an insecure fallback signing secret.");
  }
  return process.env.NEXTAUTH_SECRET ?? "dev-only-insecure-secret";
}

export function signStorageKey(key: string, expiresInSeconds = 300) {
  const expires = Date.now() + expiresInSeconds * 1000;
  const payload = `${key}.${expires}`;
  const signature = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return { expires, signature };
}

export function verifyStorageKey(key: string, expires: number, signature: string) {
  if (Date.now() > expires) return false;
  const payload = `${key}.${expires}`;
  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
