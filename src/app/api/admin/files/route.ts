import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyStorageKey } from "@/lib/signed-url";
import { readLocalObject } from "@/lib/storage";

/**
 * Serves private local-storage objects (case photos) to authenticated admin
 * sessions only, via a short-lived signed URL — see lib/storage.ts. When
 * STORAGE_DRIVER=s3 this route is unused; getSignedReadUrl returns a real
 * presigned bucket URL instead.
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const expires = Number(searchParams.get("expires"));
  const signature = searchParams.get("signature");

  if (!key || !expires || !signature || !verifyStorageKey(key, expires, signature)) {
    return NextResponse.json({ error: "Link expired or invalid." }, { status: 403 });
  }

  try {
    const { buffer } = await readLocalObject(key);
    const contentType = key.match(/\.(png|jpg|jpeg|webp|heic)$/i)
      ? `image/${key.split(".").pop()?.replace("jpg", "jpeg")}`
      : "application/octet-stream";
    return new NextResponse(Uint8Array.from(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=60",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
