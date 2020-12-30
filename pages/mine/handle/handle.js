// pages/mine/handle/handle.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	listJson:{
		pageNo:1,
		handleStatus:0
	},
	lists:[],
	oallnums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.init({})
  },
	
	
  goDetails(e) {
  	let item = e.currentTarget.dataset.item
  	wx.navigateTo({
  		url: "/pages/security/details/details?item=" + encodeURIComponent(JSON.stringify(item))
  	})
  },
  changeTab(e){
	  console.log(e)
	  this.setData({
		  listJson:{
		  	pageNo:1,
		  	handleStatus:e.currentTarget.dataset.type
		  },
	  })
	  this.init({})
  },
  init(ops){
	  
	  let json = { ...this.data.listJson
	  }
	  App.post({
	  	url: 'police/list',
	  	method: "GET",
	  	data: {
	  		...json
	  	},
	  	success: (res) => {
	  		if (ops.add) {
	  			this.setData({
	  				lists: this.data.lists.concat(res.records),
	  				oallnums: Math.ceil(res.total / res.size)
	  			})
	  		} else {
	  			this.setData({
	  				lists: res.records,
	  				oallnums: Math.ceil(res.total / res.size)
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