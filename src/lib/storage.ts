import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as s3GetSignedUrl } from "@aws-sdk/s3-request-presigner";
import { signStorageKey } from "@/lib/signed-url";

/**
 * Private object storage for consultation photos and other sensitive files.
 * Never expose a `storageKey` directly to the browser — always resolve it to
 * a short-lived signed URL through `getSignedReadUrl`, and only after the
 * caller has an authenticated admin session.
 *
 * Driver is chosen with STORAGE_DRIVER=local|s3. "local" writes to
 * ./storage/uploads (fine for a single-instance deployment or local dev).
 * "s3" targets any S3-compatible bucket (AWS S3, Cloudflare R2, Supabase
 * Storage's S3 endpoint, etc) — set STORAGE_* env vars, see .env.example.
 */

export interface StoredFile {
  key: string;
  contentType: string;
  size: number;
}

const LOCAL_ROOT = path.join(process.cwd(), "storage", "uploads");

function driver() {
  return process.env.STORAGE_DRIVER === "s3" ? "s3" : "local";
}

function s3Client() {
  return new S3Client({
    region: process.env.STORAGE_REGION || "auto",
    endpoint: process.env.STORAGE_ENDPOINT,
    forcePathStyle: Boolean(process.env.STORAGE_ENDPOINT),
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || ""
    }
  });
}

export function makeStorageKey(prefix: string, originalName: string) {
  const ext = path.extname(originalName || "").slice(0, 10) || ".bin";
  return `${prefix}/${randomUUID()}${ext}`;
}

export async function putObject(key: string, buffer: Buffer, contentType: string): Promise<StoredFile> {
  if (driver() === "s3") {
    const client = s3Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.STORAGE_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType
      })
    );
  } else {
    const dest = path.join(LOCAL_ROOT, key);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buffer);
  }
  return { key, contentType, size: buffer.byteLength };
}

export async function deleteObject(key: string) {
  if (driver() === "s3") {
    const client = s3Client();
    await client.send(new DeleteObjectCommand({ Bucket: process.env.STORAGE_BUCKET, Key: key }));
  } else {
    await fs.rm(path.join(LOCAL_ROOT, key), { force: true });
  }
}

/** Returns a signed URL an authenticated admin browser can load directly. */
export async function getSignedReadUrl(key: string, expiresInSeconds = 300): Promise<string> {
  if (driver() === "s3") {
    const client = s3Client();
    return s3GetSignedUrl(
      client,
      new GetObjectCommand({ Bucket: process.env.STORAGE_BUCKET, Key: key }),
      { expiresIn: expiresInSeconds }
    );
  }
  const { expires, signature } = signStorageKey(key, expiresInSeconds);
  const params = new URLSearchParams({ key, expires: String(expires), signature });
  return `/api/admin/files?${params.toString()}`;
}

export async function readLocalObject(key: string): Promise<{ buffer: Buffer; }> {
  const buffer = await fs.readFile(path.join(LOCAL_ROOT, key));
  return { buffer };
}
