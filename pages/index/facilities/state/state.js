// pages/index/facilities/state/state.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabList: [{
				id: 0,
				text: '消防系统'
			},
			{
				id: 1,
				text: '消火栓'
			},
			{
				id: 2,
				text: '自喷系统',
				child: [{
					id: 0,
					text: '湿式自喷'
				}]
			},
			{
				id: 3,
				text: '防排烟系统'
			},
			{
				id: 4,
				text: '气体灭火系统'
			},
			{
				id: 5,
				text: '消防供水'
			},
			{
				id: 9,
				text: '消火栓'
			},
			{
				id: 6,
				text: '自喷系统'
			},
			{
				id: 7,
				text: '防排烟系统'
			},
			{
				id: 8,
				text: '气体灭火系统'
			},
		],
		active: {
			tab: false,
			tableft: null,
			tabright: null
		},
		tabRight: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	changeLeft(e) {
		let id = e.currentTarget.dataset.id
		let item = this.data.tabList.filter(item => item.id == id)[0]
		if (item.hasOwnProperty("child")) {

			this.setData({
				'active.tableft': id,
				'active.tabright': null,
				tabRight: item.child
			})
		} else {
			this.setData({
				'active.tableft': id,
				tabRight: []
			})
			let itemt = {
				title: item.text,
				id: id,
				type: 1
			}
			wx.navigateTo({
				url: '../nextstate/nextstate?item=' + JSON.stringify(itemt) 
			})
		}

	},
	changeRight(e) {
		let id = e.currentTarget.dataset.id
		this.setData({
			'active.tabright': id
		})

		let itemP = this.data.tabList.filter(item => item.id == this.data.active.tableft)[0]
		let itemt = {
			title: itemP.text,
			id: itemP.id,
			title2:itemP.child.filter(item=>item.id ==id)[0].text,
			id:id,
			type: 2
		}
		wx.navigateTo({
			url: '../nextstate/nextstate?item=' + JSON.stringify(itemt)
		})
	},
	changeTab(e) {
		let type = e.target.dataset.type
		this.setData({
			'active.tab': type
		})
	},
	closeDs() {
		this.setData({
			'active.tab': false
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
