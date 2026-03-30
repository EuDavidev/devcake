const required = ["MONGODB_URI"];

export function getEnv() {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  return {
    mongodbUri: process.env.MONGODB_URI,
    adminSeedEmail: process.env.ADMIN_SEED_EMAIL || "",
    adminSeedPassword: process.env.ADMIN_SEED_PASSWORD || "",
  };
}
