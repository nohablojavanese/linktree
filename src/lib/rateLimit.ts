import Redis from "ioredis";
import crypto from "crypto";

const cache_url = process.env.REDIS_URL as string;
const cache_key = process.env.RATE_LIMIT_SECRET_KEY as string;

if (!cache_url || !cache_key) {
  throw new Error("Cache is not set in environment variables.");
}
const redis = new Redis(cache_url);

// Encrypt IP using AES
function encryptIP(ip: string): string {
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(cache_key, "hex"),
    Buffer.alloc(16, 0) // Initialization vector (IV)
  );
  const encrypted = Buffer.concat([cipher.update(ip), cipher.final()]);
  return encrypted.toString("hex");
}

// Hash the encrypted IP to store securely
function hashIP(encryptedIP: string): string {
  return crypto.createHash("sha256").update(encryptedIP).digest("hex");
}

export async function rateLimit(
  ip: string
): Promise<{ success: boolean; remainingAttempts: number }> {
  const encryptedIP = encryptIP(ip); // Encrypt the IP first
  const hashedIP = hashIP(encryptedIP); // Hash the encrypted IP
  const key = `Login_Attempts: ${hashedIP}`; // Use the hashed value as the Redis key

  const limit = 10;
  const windowInSeconds = 3600; // 1 hour

  const attempts = await redis.incr(key);
  if (attempts === 1) {
    await redis.expire(key, windowInSeconds);
  }

  const remainingAttempts = Math.max(0, limit - attempts);

  if (attempts > limit) {
    return { success: false, remainingAttempts };
  }

  return { success: true, remainingAttempts };
}

export async function resetRateLimit(ip: string): Promise<void> {
  const encryptedIP = encryptIP(ip);
  const hashedIP = hashIP(encryptedIP);
  const key = `Login_Attempts: ${hashedIP}`;
  await redis.del(key);
}
