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
    rsvpGuestNumber: 'How many people?',
    rsvpSubmit: 'Submit',
    mainNameError: 'Please enter your name',
    radioError: 'Please select an option',
    guestNumberError: "Please enter the number of guests",
    rsvpSentHappy1: 'Congratulations!',
    rsvpSentHappy2: 'Your RSVP has been sent successfully!',
    rsvpSentHappy3: 'See you soon!',
    rsvpSentSad2: 'Your RSVP has been sent successfully.',
    rsvpSentSad3: "Sorry you can't come, we'll talk to you soon!",
    errorText1: "We're sorry, there was a server error.",
    errorText2: "Please call to give your RSVP or try again later.",
    callRui: 'Call Rui',
    callStefan: 'Call Stefan',
    clickMap: 'Click map for directions',
    loading: 'Loading',
    shareMessage: 'An invitation...',
  },
  zh: {
    topText: '',
    rui: '李锐',
    and: '',
    stefan: '史大方',
    nameSubtitle2: '携家人',
    nameSubtitle: '诚挚邀请您出席我们的婚宴',
    date: '2019年9月28日星期六晚上6点',
    time: "",
    locationName: '',
    address1: '上海市黄浦区中山东二路505号松鹤楼',
    address2: '',
    detailsTitle: '邀请函',
    detailsPara: "我们诚挚邀请您与我们共享这个重要时刻，与最亲密的家人和朋友一起见证我们的幸福结合。",
    directions: '前往路线',
    rsvpTitle: '请确认您的莅临',
    rsvpSubtitle: '填写下方空格',
    rsvpYourName: '请填写您的姓名',
    rsvpQuestion: '您会出席吗？',
    rsvpYes: '会',
    rsvpNo: '不会',
    rsvpGuestRadio: '您会携家人出席吗？',
    rsvpGuestNumber: '您将携带几位家人与您同往？',
    rsvpSubmit: '提交',
    mainNameError: '请填写您的姓名',
    radioError: '请选择一个适合的选项',
    guestNumberError: "请填写与您同往的家人人数",
    rsvpSentHappy1: '谢谢您',
    rsvpSentHappy2: '您已成功确认出席我们的婚礼！',
    rsvpSentHappy3: '',
    rsvpSentSad2: '谢谢您的回复！',
    rsvpSentSad3: "我们再约！",
    errorText1: "不好意思，服务器已经迫不及待得跑去松鹤楼了",
    errorText2: "请给我们打个电话确认您的出席，或者稍后再试。",
    callRui: '给李锐打个电话',
    callStefan: '给史大方打个电话（英语四级以下慎点）',
    clickMap: '点击地图查看路线',
    loading: '正在加载',
    shareMessage: '这真的是一封婚礼邀请函',
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
    guestNumber: null,
    submitDisabled: true,
    mainNameError: false,
    attendingError: false,
    guestChoiceError: false,
    guestNumberError: false,
    submitLoading: false,
    sentRSVP: false,
    enLoaded: false,
    // zhLoaded: false,
    serverError: false,
    videoLoaded: false,
    appLoaded: false,
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
      if (app.globalData.sentRSVP != null && self.data.enLoaded && self.data.zhLoaded && self.data.videoLoaded) {
        setTimeout(function(){
          self.setData({
            initialLoad: true,
            sentRSVP: app.globalData.sentRSVP,
            attending: app.globalData.attending,
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
      title: this.data.currentLanguage.shareMessage,
      path: 'pages/index/index',
      imageUrl: 'https://cloud-minapp-29654.cloud.ifanrusercontent.com/1hxY8IVbf2eUCi2X.jpg',
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
  videoLoaded: function() {
    this.setData({
      videoLoaded: true,
    })
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
          if (currentPage === 0 && !this.appLoaded) {
            this.setData({
              appLoaded: true,
            })
          }
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
    } else if (e.target.dataset.input === 'guestNumber') {
      const value = Number(e.detail.value);
      if (Number.isInteger(value)) {
        this.setData({
          guestNumber: value,
          guestNumberError: false,
        });
      } else {
        this.setData({
          guestNumber: 0,
          guestNumberError: false,
        });
      }
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
        guestNumberError: false,
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
    if (this.data.guest && this.data.guestNumber === 0) {
      this.setData({
        guestNumberError: true,
      })
    } else {
      this.setData({
        guestNumberError: false,
      })
    }

    if (!this.data.mainNameError && !this.data.attendingError && !this.data.guestChoiceError && !this.data.guestNumberError) {
      wx.showLoading({
        title: this.data.currentLanguage.loading,
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
        payload.guestNumber = this.data.guestNumber;
      }
      newRSVP.set(payload);

      const self = this;
      newRSVP.save().then((res) => {
        setTimeout(function(){
          self.setData({
            sentRSVP: true,
          });
          wx.hideLoading();
        }, 1500);
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
      phoneNumber: '13524947625',
    })
  },
  callStefan: function() {
    wx.makePhoneCall({
      phoneNumber: '18616286042',
    })
  },
})