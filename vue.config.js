module.exports = {
  devServer: {
    proxy: {
      "^/": {
        target: "https://profile-submission2021.herokuapp.com",
        // target: "http://localhost:8080",
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
