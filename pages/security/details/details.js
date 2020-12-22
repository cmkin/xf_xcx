// pages/security/details/details.js
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		alert: false,
		alertr: false,
		item:{},
		pageType:0
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
				
				this.getDetails()
				
				/* let item = this.data.item
					item.handleStatus = 1
				this.setData({
					item:item
				}) */
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
	
	getDetails(){
		App.post({
			url:'police/queryById',
			method:"GET",
			data:{
				id:this.data.item.id
			},
			success:(res)=>{
				let item = res
				for(let i in item){
					if(!item[i]){
						item[i] = '暂无'
					}
				}
				this.setData({
					item: item
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		let item = JSON.parse(decodeURIComponent(options.item))
		let pageType = options.pageType || 0
			
		for(let i in item){
			if(!item[i]){
				item[i] = '暂无'
			}
		}
		this.setData({
			item: item,
			pageType:pageType
		})
		if(pageType!=1){
			this.getDetails()
		}
		
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
