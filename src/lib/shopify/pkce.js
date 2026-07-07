import crypto from "crypto";

function base64UrlEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateCodeVerifier() {
  return base64UrlEncode(crypto.randomBytes(32));
}

export function generateCodeChallenge(verifier) {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  return base64UrlEncode(hash);
}

export function generateRandomString(length = 16) {
  return base64UrlEncode(crypto.randomBytes(length));
}