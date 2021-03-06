// pages/index/video/video.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	activeItem:1,
	listJson:{
		deviceType:1,
		pageNo:1,
		pageSize:6,
		cszzlxname:''
	},
	lists:[],
	allnums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.init({})
  },
  changeItem(e){
	  let item = e.currentTarget.dataset.item
	wx.navigateTo({
		url:"./detail/detail?item=" + encodeURIComponent(JSON.stringify(item))
	})  
  },
  init(ops){
	 let json = {...this.data.listJson}
		  App.post({
				  url:'http://console.tjlinux.cn:9088/jeecg-boot/xfdevice/xfDevice/list',
				  data:{
					  ...json
				  },
				 // token:false,
				  method:"GET",
				  success:(res)=>{
					  let arr = res.records
					  for(let i in arr){
						  if(!arr[i]){
							  arr[i]='暂无'
						  }
					  }
					  res.records = arr
					  
					  if (ops.add) {
						this.setData({
							lists: this.data.lists.concat(res.records),
							allnums: Math.ceil(res.total / res.size)
						})
					  } else {
						this.setData({
							lists: res.records,
							allnums: Math.ceil(res.total / res.size)
						})
						wx.pageScrollTo({
							scrollTop: 0
						})
					  }
					  
					  
					  //隐藏导航条加载动画
					  wx.hideNavigationBarLoading();
					  //停止下拉刷新
					  wx.stopPullDownRefresh();
					  
					  
				  }
		  })
  },
  listJsonChange(e){
	  console.log(e)
	  let item = e.currentTarget.dataset.item
	  this.setData({
		  'listJson.cszzlxname':e.detail.value
	  })
	  this.init({})
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
  onPullDownRefresh: function() {
  		wx.showNavigationBarLoading();
  		this.setData({
  			'listJson': {
  				...this.data.listJson,
  				pageNo: 1
  			}
  		})
  		this.init({})
  	
  
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
  
  		if (this.data.listJson.pageNo == this.data.allnums) {
  			return
  		}
  		wx.showNavigationBarLoading();
  		this.setData({
  			'listJson': {
  				...this.data.listJson,
  				pageNo: this.data.listJson.pageNo + 1
  			}
  		})
  		this.init({
  			add: true
  		})
  	
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})