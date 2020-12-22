// pages/mine/editPassword/editPassword.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	infos:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let infos = JSON.parse(decodeURIComponent(options.infos))
	this.setData({
		infos:infos
	})
  },
	formSubmit(e){
		let form = e.detail.value
			form.username = this.data.infos.username
			console.log(form)
			for(let i in form){
				if(!form[i]){
					wx.showToast({
						title:"请填写密码",
						icon:"none"
					})
					return
				}
			}
			if(form.password != form.confirmpassword){
				wx.showToast({
					title:"两次密码不一致",
					icon:"none"
				})
				return
			}
		App.post({
			url:"http://console.tjlinux.cn:9088/jeecg-boot/sys/user/updatePassword",
			data:form,
			method:"PUT",
			success:(res)=>{
				wx.showToast({
					title:'密码重置成功,3秒后返回',
					icon:"none",
					duration:3000
				})
				setTimeout(()=>{
					wx.navigateBack({
						delta:-1
					})
				},3000)
				
			}
		})
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})