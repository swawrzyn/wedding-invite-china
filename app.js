  //app.js
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin');
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    wx.BaaS.init('4a2a0112bcf7cefccb94');

    wx.BaaS.auth.loginWithWechat().then(user => {
      let query = new wx.BaaS.Query();
      query.compare('created_by', '=', user.id);
      let Rsvp = new wx.BaaS.TableObject('rsvp');
      Rsvp.setQuery(query).find().then(res => {
        if (res.data.objects.length > 0) {
          this.globalData.sentRSVP = true;
          this.globalData.attending = res.data.objects[0].attending;
        } else {
          this.globalData.sentRSVP = false;
        }
      }, err => {
        this.globalData.sentRSVP = false;
        this.globalData.error = true;
      })
    }, err => {
      this.globalData.sentRSVP = false;
      this.globalData.error = true;
    })
  },
  
  globalData: {
    userInfo: null,
    sentRSVP: null,
    attending: null,
    error: false,
  }
})