// https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
exports.onCreateWebpackConfig = (helper) => {
  const { stage, actions, getConfig } = helper;
  
  // Add webpack fallbacks for Node.js modules
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        http: false,
        https: false,
        zlib: false,
        stream: false,
        util: false,
        buffer: false,
        assert: false,
        url: false,
      },
    },
  });

  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};
