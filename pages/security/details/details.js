// pages/security/details/details.js
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		alert: false,
		alertr: false,
		item:{}
	},
	alertM() {
		this.setData({
			alert: !this.data.alert
		})
	},
	formSubmitType(e){
		
		let form = {
			id:this.data.item.id,
			handleRemark:e.detail.value.note,
			policeResultType:e.detail.value.type
		}
		App.post({
			url:"police/handlePolice",
			data:form,
			success:(res)=>{
				this.alertM()
				wx.showToast({
					title:"处理成功",
					icon:"success",
					duration:3000
				})
				if(form.policeResultType==10){
					this.alertrM()
				}
				
				let item = this.data.item
					item.handleStatus = 1
				this.setData({
					item:item
				})
			}
		})
	},
	alertrM() {
		this.setData({
			alertr: !this.data.alertr
		})
	},
	phoneCall(){
		wx.makePhoneCall({
		  phoneNumber: '119' //仅为示例，并非真实的电话号码
		})
	},
	noclose(e) {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			item: JSON.parse(decodeURIComponent(options.item))
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
