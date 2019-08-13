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
      console.log('user', user.id);
      let query = new wx.BaaS.Query();
      query.compare('created_by', '=', user.id);
      let Rsvp = new wx.BaaS.TableObject('rsvp');
      Rsvp.setQuery(query).find().then(res => {
        console.log('res', res.data.objects);
        if (res.data.objects.length > 0) {
          this.globalData.sentRSVP = true;
        } else {
          this.globalData.sentRSVP = false;
        }
      }, err => {
        // err
      })
    }, err => {
      // 登录失败
    })
  },
  
  globalData: {
    userInfo: null,
    sentRSVP: null,
  }
})