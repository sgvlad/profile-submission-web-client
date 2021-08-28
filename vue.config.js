module.exports = {
  devServer: {
    proxy: {
      "^/": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_variables.scss"`
      }
    }
  }
};
