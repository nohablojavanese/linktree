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

function getRateLimitKey(ip: string): string {
  const encryptedIP = encryptIP(ip);
  const hashedIP = hashIP(encryptedIP);
  return `${process.env.NEXT_PUBLIC_SITE_URL}-${hashedIP}`;
}

export async function rateLimit(
  ip: string
): Promise<{ success: boolean; remainingAttempts: number; ttl?: number | null }> {
  const key = getRateLimitKey(ip);

  const limit = parseInt(process.env.RATE_LIMIT || "10", 10); 
  const windowInSeconds = parseInt(process.env.RATE_LIMIT_WINDOW || "600", 10); 

  try {
    const attempts = await redis.incr(key);
    if (attempts === 1) {
      await redis.expire(key, windowInSeconds);
    }

    const remainingAttempts = Math.max(0, limit - attempts);
    
    // Get the TTL for the key
    const ttl = await redis.ttl(key);

    if (attempts > limit) {
      return { success: false, remainingAttempts, ttl };
    }

    return { success: true, remainingAttempts, ttl };
  } catch (error) {
    console.error("Rate limit error:", error);
    return { success: true, remainingAttempts: limit, ttl: null }; // Fallback to allow access
  }
}

export async function resetRateLimit(ip: string): Promise<void> {
  const key = getRateLimitKey(ip);
  
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Error resetting rate limit:", error);
  }
}
