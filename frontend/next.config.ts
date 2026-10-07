import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? ""
      : "/proyecto-C12989-C4F588-C4H386",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
