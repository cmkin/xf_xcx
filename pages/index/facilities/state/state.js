// pages/index/facilities/state/state.js
const App = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabList: [],
		active: {
			tab: false,
			tableft: null,
			tabright: null
		},
		tabRight: [],
		item:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
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
				type: 1,
				item:this.data.item
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
			id2:id,
			type: 2,
			item:this.data.item
		}
		wx.navigateTo({
			url: '../nextstate/nextstate?item=' + JSON.stringify(itemt)
		})
	},
	changeTab(e) {
		let type = e.target.dataset.type
			if(!type){
				return
			}
		App.post({
			url:"category/getCategory",
			data:{
				type:type
			},
			method:"GET",
			success:(res)=>{
				
				this.setData({
					'active.tab': type,
					tabRight: [],
					'tabList':res.map(item=>{
						let obj = {
							id:item.id,
							text:item.name,
							item:item,
						}
						if(item.sysCategoryVoList.length){
							obj.child = item.sysCategoryVoList.map(tt=>{
								return {
									text:tt.name,
									id:tt.id,
									item:tt
								}
							})
						}
						return obj
					})
				})
			}
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
