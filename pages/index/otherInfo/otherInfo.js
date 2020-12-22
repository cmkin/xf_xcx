// pages/index/otherInfo/otherInfo.js
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		otherJson: {
			equipmentSysTime: '',
			queryWord: '',
			pageNo: 0
		},
		otherLists: [],
		noLoading: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	godetails(e) {
		let item = e.currentTarget.dataset.item
		wx.navigateTo({
			url: "/pages/security/details/details?item=" + encodeURIComponent(JSON.stringify(item)) + "&pageType=1"
		})
	},
	otherInit(ops) {
		let json = { ...this.data.otherJson
		}

		App.post({
			url: 'police/queryOtherPageList',
			method: "GET",
			data: {
				...json
			},
			success: (res) => {
				res.records = res.records.map(item=>{
					if(item.equipmentSysTime.length>1){
						item.equipmentSysTime = item.equipmentSysTime.split(" ")
					}
					return item
				})
				if (ops.add) {
					this.setData({
						otherLists: this.data.otherLists.concat(res.records),
						oallnums: Math.ceil(res.total / res.size)
					})
				} else {
					this.setData({
						otherLists: res.records,
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


	listJsonChange(e) {
		this.setData({
			otherJson: {
				...this.data.otherJson,
				queryWord:e.detail.value,
				pageNo: 0
			}
		})
		this.otherInit({})
	},
	listJsontimeChange(e) {
		this.setData({
			otherJson: {
				...this.data.otherJson,
				equipmentSysTime: e.detail.value,
				pageNo: 0
			}
		})
		this.otherInit({})
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
		if (this.data.noLoading) {
			return
		}
		if (App.cheakLogin(function() {
				wx.switchTab({
					url: "/pages/index/index"
				})
			})) {
			this.setData({
				noLoading: true
			})
			this.otherInit({})
		}
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

		wx.showNavigationBarLoading();
		this.setData({
			'otherJson': {
				...this.data.otherJson,
				pageNo: 0
			}
		})
		this.otherInit({})


	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {


		if (this.data.otherJson.pageNo == this.data.oallnums) {
			return
		}
		wx.showNavigationBarLoading();
		this.setData({
			'otherJson': {
				...this.data.otherJson,
				pageNo: this.data.otherJson.pageNo + 1
			}
		})
		this.otherInit({
			add: true
		})



	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
