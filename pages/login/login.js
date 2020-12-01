// pages/login/login.js
const App = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		/* wx.login({
		  success (res) {
		    if (res.code) {
		      //发起网络请求
		     console.log(res)
			 App.post({
				 url:'auth/wx/miniApp',
				 data:{
					 code:res.code,
					// password:'123456',
					// username:"test"
					 
				 },
				 success:function(res2){
				 					 
				 }
			 })
		    } else {
		      wx.showToast({
				  title:"登陆失败",
				  icon:"none",
				  duration:2000
			  })
		    }
		  }
		}) */
	},
	goOther() {
		wx.navigateTo({
			url: './phoneLogin/phoneLogin'
		})
	},
	formSubmit(e) {
		let form = e.detail.value

		App.post({
			url: 'login/mLogin',
			token:false,
			data: {
				password: form.password,
				username: form.username,
				code:App.globalData.code
			},
			success: (res) => {
				App.globalData.token = res.token
				App.globalData.userInfo = res.sysUser
				
				wx.setStorage({
				  key:"token",
				  data:res.token
				})
				
				if (App.globalData.userInfo && App.globalData.userInfo.phone) {
					wx.switchTab({
						url: '/pages/index/index'
					})
				} else {
					wx.navigateTo({
						url: './phoneBind/phoneBind'
					})
				}


			}
		})


	},

	wxLogin() {
		App.post({
			url: 'auth/wx/miniApp',
			token:false,
			data: {
				code:App.globalData.code
			},
			success:(res)=>{
				App.globalData.token = res.token
				App.globalData.userInfo = res.sysUser
				
				if (App.globalData.userInfo && App.globalData.userInfo.phone) {
					wx.switchTab({
						url: '/pages/index/index'
					})
				} else {
					wx.navigateTo({
						url: './phoneBind/phoneBind'
					})
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
