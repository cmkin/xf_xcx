// pages/security/security.js
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		noLoading: false,
		pageType: 0,
		hotLists: [],
		otherLists: [],
		allnums: 0,
		oallnums: 0,
		zllist:['报警信息种类','探测器','手报','传输装置'],
		xzlist:[
			{
				id:0,
				text:'报警性质'	
			},
			{
				id:10,
				text:'真实火警'
			},
			{
				id:20,
				text:'测试'
			},
			{
				id:30,
				text:'误报'
			}
		],
		flag:{
			zl:false,
			xz:false
		},
		xztext:'报警性质',
		listJson: {
			pageNo: 0,
			handleStatus: 100,
			queryWord: '',
			equipmentSysTime: '',
			equipmentType:'报警信息种类',
			policeResultType:0
		},
		otherJson: {
			companyName:'',
			equipmentSysTime:'',
			deviceType:'',
			pageNo:0
		}
	},
	flagZl(){
		this.setData({
			'flag.zl':!this.data.flag.zl,
			'flag.xz':false
		})
	},
	flagXz(){
		this.setData({
			'flag.zl':false,
			'flag.xz':!this.data.flag.xz
		})
	},
	changeZl(e){
		this.setData({
			'listJson.equipmentType':e.currentTarget.dataset.item
		})
		this.flagZl()
		this.init({})
	},
	changeXz(e){
		this.setData({
			'listJson.policeResultType':e.currentTarget.dataset.id,
			'xztext':this.data.xzlist.filter(item=>item.id==e.currentTarget.dataset.id)[0].text
		})
		this.flagXz()
		this.init({})
	},
	goDetails(e) {
		let item = e.currentTarget.dataset.item
		wx.navigateTo({
			url: "./details/details?item=" + encodeURIComponent(JSON.stringify(item))
		})
	},
	listJsonChange(e) {
		console.log(e)
		let typej = Number(e.currentTarget.dataset.typej)
		let listJson = { ...this.data.listJson
		}
		listJson.pageNo = 0
		switch (typej) {
			case 0:
				if (e.target.dataset.type == 200) {
					return
				}
				listJson.handleStatus = e.target.dataset.type
				break;
			case 1:
				listJson.equipmentSysTime = e.detail.value ? e.detail.value : 0
				break;
			case 2:
				listJson.queryWord = e.detail.value
				break;
		}

		this.setData({
			'listJson': listJson
		})
		this.init({})
	},

	changePage(e) {
		this.setData({
			pageType: e.target.dataset.type
		})
	},

	init(ops) {
		let json = { ...this.data.listJson
		}
		if (json.handleStatus == 100) {
			delete json.handleStatus
		}
		if (json.equipmentSysTime == 0) {
			delete json.equipmentSysTime
		}
		if(json.equipmentType=='报警信息种类'){
			delete json.equipmentType
		}/* else if(json.equipmentType!='传输装置'){
			json.equipmentType = '*'+json.equipmentType+'*'
		} */
		if(json.policeResultType==0){
			delete json.policeResultType
		}
		
		/* if(json.queryWord){
			json.queryWord = '*'+json.queryWord+'*'
		} */
		
		App.post({
			url: "police/list",
			method: "GET",
			data: {
				...json
			},
			success: (res) => {
				if (ops.add) {
					this.setData({
						hotLists: this.data.hotLists.concat(res.records),
						allnums: Math.ceil(res.total / res.size)
					})
				} else {
					this.setData({
						hotLists: res.records,
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
	
	formOther(e){
			this.setData({
				'otherJson.pageNo':0
			})
		switch(e.detail.type){
			case 1:
				this.setData({
					'otherJson.companyName':e.detail.value
				})
			break;
			case 2:
				this.setData({
					'otherJson.equipmentSysTime':e.detail.value
				})
			break;
			case 3:
				this.setData({
					'otherJson.deviceType':e.detail.value
				})
			break;
		}
		
		this.otherInit({})
		
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {


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
		/* if (this.data.noLoading) {
			return
		} */
		if (App.cheakLogin(function() {
				wx.switchTab({
					url: "/pages/index/index"
				})
			})) {
			this.setData({
				noLoading: true
			})
			this.init({})
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
		if (this.data.pageType == 0) {
			wx.showNavigationBarLoading();
			this.setData({
				'listJson': {
					...this.data.listJson,
					pageNo: 0
				}
			})
			this.init({})
		} else {
			wx.showNavigationBarLoading();
			this.setData({
				'otherJson': {
					...this.data.otherJson,
					pageNo: 0
				}
			})
			this.otherInit({})
		}

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

		if (this.data.pageType == 0) {
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
		} else {
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

		}

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
