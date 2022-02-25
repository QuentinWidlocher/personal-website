/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
  mdx: async filename => {
    const [remarkMdx, remarkGfm] = await Promise.all([
      import("remark-mdx").then(mod => mod.default),
      import("remark-gfm").then(mod => mod.default),
    ]);

    const [rehypeSlug, rehypeAutolink, rehypePrismPlus, rehypeToc] = await Promise.all([
      import("rehype-slug").then(mod => mod.default),
      import("rehype-autolink-headings").then(mod => mod.default),
      import("rehype-prism-plus").then(mod => mod.default),
      import("@atomictech/rehype-toc").then(mod => mod.default),
    ]);

    return {

    };
  },
};