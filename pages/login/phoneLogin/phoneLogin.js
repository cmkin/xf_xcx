const App = getApp()
// pages/login/login.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		phone: '',
		nums: 60,
		numFlag: false,
		numText: '发送验证码'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	back() {
		wx.navigateBack()
	},
	getPhone(e) {
		this.setData({
			phone: e.detail.value
		})
	},
	getCode() {
		console.log(this.data.numFlag)
		if (this.data.numFlag) {
			return
		}
		if (this.data.phone && this.data.phone.length == 11) {
			App.post({
				url: 'login/sms',
				token: false,
				data: {
					mobile: this.data.phone,
					smsmode: 0
				},
				success: (res) => {
					this.setData({
						numFlag: true
					})
					let s = setInterval(()=>{
						if(this.data.nums<=0){
							this.setData({
								nums: 60,
								numFlag:false,
								numText:'发送验证码'
							})
							clearInterval(s)
							return
						}
						this.setData({
							nums: this.data.nums-1,
							numText:this.data.nums+"s后重发"
						})
					}, 1000)
				}
				
			})
		} else {
			wx.showToast({
				title: "请输入正确的手机号",
				icon: "none",
				duration: 3000
			})
		}
	},
	wxLogin() {
		App.post({
			url: 'auth/wx/miniApp',
			token:false,
			data: {
				code: App.globalData.code
			},
			success: (res) => {
				App.saveUser(res)
				
				wx.switchTab({
					url: '/pages/index/index'
				})
				return  false
				if (App.globalData.userInfo && App.globalData.userInfo.phone) {
					
				} else {
					wx.navigateTo({
						url: '/pages/login/phoneBind/phoneBind'
					})
				}
			}
		})
	},
	formSubmit(e) {
		let form = e.detail.value
		
		App.post({
			url:'login/phoneLogin',
			token:false,
			data:{
				mobile:form.phone,
				captcha:form.code,
				code:App.globalData.code
			},
			success:(res)=>{
				App.saveUser(res)
				
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
