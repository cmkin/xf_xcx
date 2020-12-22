// pages/mine/info/info.js
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		infos:false,
		avatar:null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
			let infos = JSON.parse(decodeURIComponent(options.infos))
				this.setData({
					avatar:infos.avatar,
					infos:infos
				})
	},
	changeImg() {
		
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success:(res)=>{
				// tempFilePath可以作为img标签的src属性显示图片
				wx.showLoading()
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					//url: 'http://console.tjlinux.cn:9088/jeecg-boot/app/user/updateUser', //仅为示例，非真实的接口地址
					url:'http://console.tjlinux.cn:9088/jeecg-boot/app/file/upload',
					filePath: tempFilePaths[0],
					name: 'file',
					header:{
						"X-Access-Token": App.globalData.token,
						"content-Type": "multipart/form-data"
					},
					formData: {
						biz:'temp'
					},
					success:(res)=>{
						console.log(res)
						wx.hideLoading()
						const data = JSON.parse(res.data).message
						this.setData({
							avatar:data
						})		
						//do something
					},
					fail:()=>{
						wx.showToast({
							title:"上传失败",
							icon:"none"
						})
					}
				})

			},
			
		})
	},
	
	submit(){
		App.post({
			url:'user/updateUser',
			data:{
				avatar:this.data.avatar
			},
			success:(res)=>{
				wx.showToast({
					title:"保存成功"
				})
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
