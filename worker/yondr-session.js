// The Yondr session: what every *.overyondrdev.com site checks. Copy this file (unchanged) into a site that needs
// sign-in; it only needs the PUBLIC key, set as the YONDR_AUTH_PUBLIC_JWK variable (safe to commit).
//
//   const user = await yondrUser(request, env);          // { email, name } or null
//   if (!user) return Response.redirect(loginUrl(request), 302);
//
// Source of truth: overyondr-website-v1/auth/src/session.js. Keep copies identical.

export const AUTH_ORIGIN = 'https://auth.overyondrdev.com';
export const SESSION_COOKIE = 'yondr_session';
export const SESSION_ISSUER = AUTH_ORIGIN;
export const SESSION_AUDIENCE = 'overyondrdev.com';

let keyCache = null;
let keyCacheFor = '';

function b64uToBytes(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(s + '='.repeat((4 - (s.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export function readCookie(request, name) {
  const m = (request.headers.get('cookie') || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : null;
}

async function publicKey(env) {
  const raw = env.YONDR_AUTH_PUBLIC_JWK || '';
  if (keyCache && keyCacheFor === raw) return keyCache;
  const jwk = JSON.parse(raw);
  keyCache = {
    kid: jwk.kid,
    key: await crypto.subtle.importKey('jwk', { kty: jwk.kty, crv: jwk.crv, x: jwk.x, y: jwk.y }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']),
  };
  keyCacheFor = raw;
  return keyCache;
}

/** Verify a session token. Returns its claims or null. */
export async function verifySession(token, env) {
  if (!token || !env.YONDR_AUTH_PUBLIC_JWK) return null;
  try {
    const [h, p, s] = token.split('.');
    if (!h || !p || !s) return null;
    const header = JSON.parse(new TextDecoder().decode(b64uToBytes(h)));
    const pk = await publicKey(env);
    if (header.alg !== 'ES256' || header.kid !== pk.kid) return null;
    const ok = await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, pk.key, b64uToBytes(s), new TextEncoder().encode(`${h}.${p}`));
    if (!ok) return null;
    const c = JSON.parse(new TextDecoder().decode(b64uToBytes(p)));
    const now = Date.now() / 1000;
    if (c.typ !== 'session' || c.iss !== SESSION_ISSUER || c.aud !== SESSION_AUDIENCE) return null;
    if (!c.exp || c.exp < now || (c.nbf && c.nbf > now + 60)) return null;
    const email = String(c.email || '').toLowerCase();
    const domains = String(env.ALLOWED_EMAIL_DOMAINS || 'overyondr.com').split(',').map((d) => d.trim().toLowerCase()).filter(Boolean);
    if (!domains.includes(email.slice(email.lastIndexOf('@') + 1))) return null;
    return { email, name: c.name || null };
  } catch {
    return null;
  }
}

/** The signed-in Yondr person for this request, or null. */
export async function yondrUser(request, env) {
  return verifySession(readCookie(request, SESSION_COOKIE), env);
}

/** Where to send someone who isn't signed in; they come back to the same URL afterwards. */
export function loginUrl(request) {
  return `${AUTH_ORIGIN}/login?return=${encodeURIComponent(request.url)}`;
}
export function logoutUrl(returnTo) {
  return `${AUTH_ORIGIN}/logout${returnTo ? `?return=${encodeURIComponent(returnTo)}` : ''}`;
}
