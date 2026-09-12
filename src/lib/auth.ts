import { cookies } from "next/headers";
import { UserRole } from "@/types";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "talentiq-connect-hackathon-2026-sih26044-secret-key-32chars";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institution?: string;
  department?: string;
  exp?: number;
}

function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export async function signToken(user: SessionUser): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const payload = { ...user, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET_STRING),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signatureInput)
  );

  let binarySig = "";
  const sigBytes = new Uint8Array(signature);
  for (let i = 0; i < sigBytes.byteLength; i++) {
    binarySig += String.fromCharCode(sigBytes[i]);
  }
  const encodedSignature = btoa(binarySig)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${signatureInput}.${encodedSignature}`;
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET_STRING),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    let sigStr = encodedSignature.replace(/-/g, "+").replace(/_/g, "/");
    while (sigStr.length % 4) {
      sigStr += "=";
    }
    const binarySig = atob(sigStr);
    const sigBytes = new Uint8Array(binarySig.length);
    for (let i = 0; i < binarySig.length; i++) {
      sigBytes[i] = binarySig.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(signatureInput)
    );

    if (!isValid) return null;

    const payload: SessionUser = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}
