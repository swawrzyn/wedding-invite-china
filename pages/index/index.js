const order = ['one', 'two', 'three'];

const texts = {
  en: {
    topText: 'together with their families',
    rui: 'Rui',
    and: '&',
    stefan: 'Stefan',
    nameSubtitle: 'joyfully invite you to their wedding dinner',
    date: 'Saturday, September 28th, 2019',
    time: "6 o'clock in the evening",
    locationName: 'The Riveira Restaurant',
    address: '505 Zhongshan Dong Er Road, Huangpu Dist., Shanghai',
    detailsTitle: 'Details',
    detailsPara: "We would like to invite you for a small dinner at the Rivera Restaurant to celebrate our wedding. It's an occation for family and friends to come together and have a few laughs, some drinks and good food.",
    directions: 'Directions',
    rsvpTitle: 'RSVP',
  },
  zh: {
    topText: 'together with their families',
    rui: 'Rui',
    and: '&',
    stefan: 'Stefan',
    nameSubtitle: 'joyfully invite you to their wedding dinner',
    date: 'Saturday, September 28th, 2019',
    time: "6 o'clock in the evening",
    locationName: 'The Riveira Restaurant',
    address: '505 Zhong Shan Dong Er Road, Huangpu Dist., Shanghai',
    detailsTitle: 'Details',
    detailsPara: "We would like to invite you for a small dinner at the Rivera Restaurant to celebrate our wedding. It's an occation for family and friends to come together and have a few laughs, some drinks and good food.",
    directions: 'Directions',
  }
}

Page({
  data: {
    barHeight: 0,
    initTouch: 0,
    currentPage: 0,
    windowHeight: 0,
    containerHeight: 0,
    toSect: 'one',
    isScroll: false,
    initalLoad: false,
    currentLanguage: {},
  },
  onLoad: function () {
    wx.loadFontFace({
      family: 'Custom EN',
      source: 'url("https://fonts.gstatic.com/s/nanummyeongjo/v15/9Btx3DZF0dXLMZlywRbVRNhxy1LuEGI-gZ_Ll9dMHVruCTvHYAnNT2g.0.woff2")',
      complete: console.log
    })
    const sysInfo = wx.getSystemInfoSync();
    const self = this;
    setTimeout(function(){
      self.setData({
        initalLoad: true,
      })
    }, 2000);
    this.setData({
      currentLanguage: texts['en'],
    });
    this.setData({
      barHeight: sysInfo.statusBarHeight,
      windowHeight: sysInfo.windowHeight,
      containerHeight: sysInfo.windowHeight,
    });
  },

  setInitPos: function (e) {
    this.setData({
      initTouch: e.touches[0].pageY,
    })
  },

  scrollTo: function (e) {
    const wiggleRoom = Math.abs(this.data.initTouch - e.changedTouches[0].pageY) > 20;
    const currentPage = this.data.currentPage;
    console.log(currentPage)
    this.setData({
      isScroll: true,
    })
    if (wiggleRoom && this.data.initTouch > e.changedTouches[0].pageY) {
      if (currentPage >= 0 && currentPage < 2) {
        this.setData({
          isScroll: true,
          currentPage: currentPage + 1,
          toSect: order[currentPage + 1],
        });
      }
    } else if (wiggleRoom && this.data.initTouch < e.changedTouches[0].pageY) {
      if (currentPage > 0 && currentPage <= 2) {
        this.setData({
          currentPage: currentPage - 1,
          toSect: order[currentPage - 1],
          isScroll: true,
        });
      }
    } else {
    }
    this.setData({
      isScroll: false,
    });
  },
  toMap: function() {
    wx.openLocation({
      // 松鹤楼 121.504065,31.234176
      // 31.228675, 121.497214
      name: 'RIVIERA松鹤楼(外滩店)',
      address: '上海市黄浦区中山东二路505号',
      longitude: 121.497214,
      latitude: 31.228675,
      scale: 14,
    })
  },
})