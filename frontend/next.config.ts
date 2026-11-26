import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {

  output: "export",

  env: {
    API_URL: process.env.API_URL ?? "http://localhost:8082/api/v1",
  },
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
