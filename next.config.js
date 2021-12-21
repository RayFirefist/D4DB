module.exports = {
    future: {
      webpack5: true,
    },
    webpack: (config, { isServer, dev, webpack }) => {
      config.output.chunkFilename = isServer
        ? `${dev ? "[name]" : "[name].[fullhash]"}.js`
        : `static/chunks/${dev ? "[name]" : "[name].[fullhash]"}.js`;
      config.plugins.push(
        new webpack.ProvidePlugin({
          PIXI: "pixi.js",
          spine: "pixi-spine",
        })
      );
  
      config.output.hotUpdateMainFilename =
        "static/webpack/[fullhash].[runtime].hot-update.json";
  
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
  
      return config;
    },
  };