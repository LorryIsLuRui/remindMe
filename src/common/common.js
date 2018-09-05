const commonJs={
    getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                return res.userInfo;
                
              }
            })
          }
        })
      },
};
export default commonJs;