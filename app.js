//app.js
App({
  onLaunch: function () {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://fonts.gstatic.com/s/nanummyeongjo/v15/9Btx3DZF0dXLMZlywRbVRNhxy1LuEGI-gZ_Ll9dMHVruCTvHYAnNT2g.0.woff2")',
      success: console.log
    })
  },
  globalData: {
    userInfo: null
  }
})