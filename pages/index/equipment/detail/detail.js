// pages/index/equipment/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	imgList:[
		"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg"
	],
	item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let item = JSON.parse(decodeURIComponent(options.item))
		
		for(let i in item){
			if(!item[i]){
				item[i] = '暂无'
			}
		}
		this.setData({
			item: item
		})
  },
  preview(event) {
      console.log(event.currentTarget.dataset.src)
      let currentUrl = event.currentTarget.dataset.src
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: this.data.imgList // 需要预览的图片http链接列表
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