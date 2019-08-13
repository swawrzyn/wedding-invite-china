const app = getApp();

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
    address1: '505 Zhongshan Dong Er Road,',
    address2: 'Huangpu District, Shanghai',
    detailsTitle: 'Details',
    detailsPara: "We would like to invite you for a small dinner at the Rivera Restaurant to celebrate our wedding. It's an occation for family and friends to come together and have a few laughs, some drinks and good food.",
    directions: 'Directions',
    rsvpTitle: 'RSVP',
    rsvpSubtitle: 'Please fill in the form below',
    rsvpYourName: 'What is your name?',
    rsvpQuestion: 'Will you be attending?',
    rsvpYes: 'Yes',
    rsvpNo: 'No',
    rsvpGuestRadio: 'Will you be bringing someone?',
    rsvpGuestName: 'What is their name?',
    rsvpSubmit: 'Submit',
    mainNameError: 'Please enter your name',
    radioError: 'Please select an option',
    guestNameError: "Please enter your guest's name",
    rsvpSent1: 'Congrats!',
    rsvpSent2: 'Your RSVP has been sent successfully!',
    rsvpSent3: 'See you soon!',
    errorText1: "We're sorry, there was a server error.",
    errorText2: "Please call to give your RSVP or try again later.",
    callRui: 'Call Rui',
    callStefan: 'Call Stefan',
  },
  zh: {
    topText: 'together with their families',
    rui: '李锐',
    and: '&',
    stefan: 'Stefan',
    nameSubtitle: 'joyfully invite you to their wedding dinner',
    date: 'Saturday, September 28th, 2019',
    time: "6 o'clock in the evening",
    locationName: 'The Riveira Restaurant',
    address1: '505 Zhongshan Dong Er Road,',
    address2: 'Huangpu District, Shanghai',
    detailsTitle: 'Details',
    detailsPara: "We would like to invite you for a small dinner at the Rivera Restaurant to celebrate our wedding. It's an occation for family and friends to come together and have a few laughs, some drinks and good food.",
    directions: 'Directions',
    rsvpTitle: 'RSVP',
    rsvpSubtitle: 'Please fill in the form below',
    rsvpName: 'Name',
    rsvpQuestion: 'Will you be attending?',
    rsvpYes: 'Yes',
    rsvpNo: 'No',
    rsvpGuestRadio: 'Will you be bringing someone?',
    rsvpName: 'What is their name?',
    rsvpSubmit: 'Submit',
    mainNameError: 'Please enter your name',
    radioError: 'Please select an option',
    guestNameError: "Please enter your guest's name",
    rsvpSent: 'Congrats, your RSVP has been sent! See you soon!',
    rsvpSent1: 'Congrats!',
    rsvpSent2: 'Your RSVP has been sent successfully!',
    rsvpSent3: 'See you soon!',
    errorText1: "We're sorry, there was a server error.",
    errorText2: "Please call to give your RSVP or try again later.",
    callRui: 'Call Rui',
    callStefan: 'Call Stefan',
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
    initialLoad: false,
    currentLanguage: texts.zh,
    oppositeLang: 'EN',
    mainName: '',
    attending: null,
    guest: null,
    guestName: '',
    submitDisabled: true,
    mainNameError: false,
    attendingError: false,
    guestChoiceError: false,
    guestNameError: false,
    submitLoading: false,
    sentRSVP: false,
    enLoaded: false,
    zhLoaded: false,
    serverError: false,
  },
  onLoad: function () {
    const self = this;
    wx.loadFontFace({
      family: 'Custom EN',
      source: 'url("https://cloud-minapp-29654.cloud.ifanrusercontent.com/1hxBVd1wG2mv9lc6.ttf")',
      complete() {
        self.setData({
          enLoaded: true,
        });
      }
    })
    wx.loadFontFace({
      family: 'Custom ZH',
      source: 'url("https://cloud-minapp-29654.cloud.ifanrusercontent.com/1hxSYaIgdn7yWKDq.ttf")',
      complete() {
        self.setData({
          zhLoaded: true,
        });
      }
    })
    const sysInfo = wx.getSystemInfoSync();
    
    
    let timerId = setInterval(function() {
      if (app.globalData.sentRSVP != null && self.data.enLoaded && self.data.zhLoaded) {
        setTimeout(function(){
          self.setData({
            initialLoad: true,
            sentRSVP: app.globalData.sentRSVP,
            serverError: app.globalData.error,
          });
          clearInterval(timerId);
        }, 2000);
      }
    }, 2000);

    if (sysInfo.language === 'en') {
      this.setData({
        currentLanguage: texts['en'],
        oppositeLang: '中文',
      });  
    }
    
    this.setData({
      barHeight: sysInfo.statusBarHeight,
      windowHeight: sysInfo.windowHeight,
      containerHeight: sysInfo.windowHeight,
    });
  },
  onShareAppMessage: function () {
    return {
      title: 'An invitation...',
      path: 'pages/index/index'
    }
  },
  changeLang: function() {
    if (this.data.oppositeLang === '中文') {
      this.setData({
        oppositeLang: 'EN',
        currentLanguage: texts.zh,
      });
    } else {
      this.setData({
        oppositeLang: '中文',
        currentLanguage: texts.en,
      });
    }
  },
  setInitPos: function (e) {
    this.setData({
      initTouch: e.touches[0].pageY,
    })
  },
  scrollTo: function (e) {
    if (this.data.initialLoad) {
      const wiggleRoom = Math.abs(this.data.initTouch - e.changedTouches[0].pageY) > 20;
      const currentPage = this.data.currentPage;
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
    }
  },
  nextSect: function() {
    const currentPage = this.data.currentPage;
    this.setData({
      isScroll: true,
    });
    this.setData({
      currentPage: currentPage + 1,
      toSect: order[currentPage + 1],
    });
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
  bindInput: function(e) {
    if (e.target.dataset.input === 'mainName'){
      this.setData({
        mainName: e.detail.value,
        mainNameError: false,
      });
    } else if (e.target.dataset.input === 'guestName') {
      this.setData({
        guestName: e.detail.value,
        guestNameError: false,
      });
    }
  },
  radioChange: function(e) {
    if (e.detail.value === 'yes-attend') {
      this.setData({
        attending: true,
        guest: null,
        attendingError: false,
      });
    } else if (e.detail.value === 'no-attend') {
      this.setData({
        attending: false,
        guest: false,
        attendingError: false,
      });
    } else if (e.detail.value === 'yes-guest') {
      this.setData({
        guest: true,
        guestChoiceError: false,
      });
    } else if (e.detail.value === 'no-guest') {
      this.setData({
        guest: false,
        guestChoiceError: false,
        guestNameError: false,
      });
    }
  },
  submitRSVP: function() {
    if (this.data.mainName.trim() === '') {
      this.setData({
        mainNameError: true,
      });
    } else {
      this.setData({
        mainNameError: false,
      });
    }
    if (this.data.attending === null) {
      this.setData({
        attendingError: true,
      });
    } else {
      this.setData({
        attendingError: false,
      });
    }
    if (this.data.attending && this.data.guest === null) {
      this.setData({
        guestChoiceError: true,
      })
    } else {
      this.setData({
        guestChoiceError: false,
      })
    }
    if (this.data.guest && this.data.guestName.trim() === '') {
      this.setData({
        guestNameError: true,
      })
    } else {
      this.setData({
        guestNameError: false,
      })
    }

    if (!this.data.mainNameError && !this.data.attendingError && !this.data.guestChoiceError && !this.data.guestNameError) {
      wx.showLoading({
        mask: true,
      });
      let rsvpTable = new wx.BaaS.TableObject('rsvp');

      let newRSVP = rsvpTable.create();
      const payload = {
        name: this.data.mainName,
        attending: this.data.attending,
        guest: this.data.guest,
      }

      if (this.data.guest) {
        payload.guestName = this.data.guestName;
      }
      newRSVP.set(payload);

      newRSVP.save().then((res) => {
        this.setData({
          sentRSVP: true,
        });
        wx.hideLoading();
      }, (err) => {
        this.setData({
          serverError: true,
        });
        wx.hideLoading({
          complete() {
            wx.showToast({
              image: 'img/error.png',
              title: 'Server Error',       
            });
          },
        })
      });
    }
  },
  callRui: function() {
    wx.makePhoneCall({
      phoneNumber: '18616286042',
    })
  },
  callStefan: function() {
    wx.makePhoneCall({
      phoneNumber: '18616286042',
    })
  },
})