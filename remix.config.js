/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  server: process.env.NODE_ENV == 'production' ? './server.js' : undefined,
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
};
=======
  serverDependenciesToBundle: ['mermaid']
};
>>>>>>> Stashed changes
