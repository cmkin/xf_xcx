// pages/index/facilities/nextstate/nextstate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	item:{},
	tabList:[
		{
			id:1,
			text:'消防水池'
		},
		{
			id:2,
			text:'消防水箱'
		},
		{
			id:3,
			text:'(某)湿式管网'
		},
		{
			id:4,
			text:'喷淋泵'
		}
	],
	moreList:[
		{
			id:1,
			text:'消防水池'
		},
		{
			id:2,
			text:'喷淋泵启动方式'
		},
		{
			id:3,
			text:'消防水箱'
		},
		{
			id:4,
			text:'1号喷淋泵'
		},
		{
			id:5,
			text:'(某)湿式管网'
		},
		{
			id:6,
			text:'2号喷淋泵'
		},
		{
			id:7,
			text:'喷淋泵控制方式'
		},
		{
			id:8,
			text:'喷淋泵故障'
		}
	],
	active:{
		moreFlag:false,
		alert:false,
		tab:1,
		more:1
	}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 options = {item: '{"title":"自喷系统","id":0,"title2":"湿式自喷","type":2}'}
	 let item = JSON.parse(options.item)
		console.log(item)
		if(item.type==1){
			wx.setNavigationBarTitle( {
				title:item.title
			})
		}else{
			wx.setNavigationBarTitle({
				title:item.title+"-"+item.title2
			})
		}
		this.setData({
			item:item
		})
  },
  openMore(){
	this.setData({
		'active.moreFlag':!this.data.active.moreFlag
	})  
  },
  alertM(){
	  this.setData({
	  	'active.alert':!this.data.active.alert
	  }) 
  },
  gohistory(){
	wx.navigateTo({
		url:"../history/history"
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