// pages/index/video/list/list.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	tabs:[],
	sjzgdwtypeid:'',
	sjzgdwtypeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		App.post({
			url:'http://console.tjlinux.cn:9088/jeecg-boot/networking/xfCompany/list',
			method:"GET",
			data:{
				pageNo: 1,
				pageSize: 10
			},
			success:(res)=>{
				
				console.log(res)
				this.setData({
					tabs:res.records,
					sjzgdwtypeid:res.records[0].orgCode
				})
				this.getVidoes()
			}
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeTab(e){
	  let sjzgdwtypeid = e.currentTarget.dataset.sjzgdwtypeid
		this.setData({
			sjzgdwtypeid:sjzgdwtypeid
		})
		this.getVidoes()
  },
  getVidoes(){
	  App.post({
	  	url:'http://console.tjlinux.cn:9088/jeecg-boot/xfdevice/xfDevice/queryByCompanyCode',
	  	method:"GET",
	  	data:{
	  		companyid: this.data.sjzgdwtypeid,
	  	},
	  	success:(res)=>{
	  		console.log(res)
			this.setData({
				sjzgdwtypeList:[res]
			})
	  		
	  	},
		error:(res)=>{
			wx.showToast({
				title: res.message,
				icon: 'none',
				duration: 3000
			})
			this.setData({
				sjzgdwtypeList:[]
			})
		}
	  })
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