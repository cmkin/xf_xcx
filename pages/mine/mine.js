// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	itemList:[
		{
			text:'我的历史',
			link:'./history/history',
			top:true
		},
		{
			text:'我的处理',
			link:'./handle/handle',
		},
		{
			text:'我的核对',
			link:'',
		},
		{
			text:'关于我们',
			link:'./about/about',
		},
		{
			text:'修改密码',
			link:'./editPassword/editPassword',
			top:true
		},
		{
			text:'切换帐号',
			link:'./account/account',
		},
		{
			text:'退出帐号',
			event:'lgout',
		}
	]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goInfo(){
	  wx.navigateTo({
		  url:'./info/info'
	  })
  },
  goLink(e){
	 let item = e.currentTarget.dataset.item
		if(item.link){
			wx.navigateTo({
				url:item.link
			})
		}
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