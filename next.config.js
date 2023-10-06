const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glsl-shader-loader'
        ]
      });
      config.resolve.alias = {
        ...config.resolve.alias,
        'juxtaposejs': 'juxtaposejs/dist/juxtapose.min.js'
      };
  
      return config;
    },
  }
  
  module.exports = nextConfig;
  