/** @type {import('next').NextConfig} */

const nextConfig = {
 
  // webpack: (config, { isServer }) => {
  //   config.module.rules.push({
  //       test: /\.node$/,
  //       loader: 'file-loader',
  //     });
  //   if (!isServer) {
        
  //     config.resolve = {
  //       ...config.resolve,
  //       fallback: {
  //         // zlib: require.resolve('browserify-zlib'),  

  //         zlib: require.resolve("browserify-zlib"),
  //         // util: require.resolve("util"),
  //         // buffer: require.resolve("buffer"),
  //         // asset: require.resolve("assert"),
  //         // fixes proxy-agent dependencies
  //         net: false,
  //         dns: false,
  //         tls: false,
  //         assert: false,
  //         // fixes next-i18next dependencies
  //         path: false,
  //         fs: false,
  //         // fixes mapbox dependencies
  //         events: false,
  //         // fixes sentry dependencies
  //         process: false,
  //         child_process: false,
  //       }
  //     };
    
  //   }
  //   config.module.exprContextCritical = false; // Workaround to suppress next-i18next warning, see https://github.com/isaachinman/next-i18next/issues/1545

  //   return config;
  // },
  
  distDir: "dist",

};


module.exports = nextConfig


