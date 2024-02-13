/** @type {import("next").NextConfig} */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const wpBaseUrl = `${process.env.NEXT_PUBLIC_WP_URL?.replace("https://", "").replace("/", "")}`;

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: wpBaseUrl,
        },
        {
          protocol: "https",
          hostname: "secure.gravatar.com",
        },
      ],
    },
}

export default nextConfig;
