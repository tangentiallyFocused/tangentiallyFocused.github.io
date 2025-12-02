export default ({
  // assetsInclude: ['**/*.png'],
  base: './',
  build: {
  //   outDir: '../',
    // assetsDir: 'public',
    // assetsInlineLimit: 22*1024*1024
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})