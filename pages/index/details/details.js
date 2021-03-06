// pages/index/details/details.js
var WxParse = require('../../wxParse/wxParse.js');
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
	iconsLists:[
		{
			icon:'/images/icon-like.png',
			select:'/images/icon-like-select.png',
			text:"点赞",
			num:0,
			type:1
		},
		{
			icon:'/images/icon-collect.png',
			select:'/images/icon-collect-select.png',
			text:"收藏",
			num:0,
			type:2
		},
		{
			icon:'/images/icon-forward.png',
			select:'/images/icon-like-select.png',
			text:"转发",
			num:0,
			type:3
		}
		
	],
	item:{},
	opacity:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let id = options.id
		this.getItem(id)
  },
  getItem(id){
	  var that = this;
	  App.post({
	  	url:'article/queryById',
	  	token:App.globalData.token?true:false,
	  	method:'GET',
	  	data:{
	  		id:id
	  	},
	  	success:(res)=>{
				res.izfollow = res.izfollow ==null ? 0 : res.izfollow
				res.izGive = res.izGive ==null ? 0 : res.izGive
				
	  		let item = res
				
	  		this.setData({
	  			item:item,
	  			iconsLists:this.data.iconsLists.map(it=>{
	  				if(  it.type==1){
							it.num = item.giveCount
						if(item.izGive == 1){
							it.icon = '/images/icon-like-select.png'
						}else{
							it.icon = '/images/icon-like.png'
						}
	  					
	  				}
					if(  it.type==2){
						it.num = item.followCount
						if(item.izfollow == 1){
							it.icon = '/images/icon-collect-select.png'
						}else{
							it.icon = '/images/icon-collect.png'
						}
						
					}
					if(it.type==3){
						it.num = item.zfCount
					}
	  				return it
	  			})
	  		})	
	  		var article = item.content;	
	  		WxParse.wxParse('article', 'html', item.content, that, 5);
			
			setTimeout(()=>{
				this.setData({
					opacity:1
				})
			},300)
			
	  	}
	  })
	  
  },
  iconAction(e){
	  let type = e.currentTarget.dataset.type
	   
	  switch(type){
		  case 1:
			App.post({
				url:this.data.item.izGive == 0 ?'articleUser/confirm':'articleUser/cancel',
				data:{
					type:type,
					articleId:this.data.item.id
				},
				success:(res)=>{
					this.getItem(this.data.item.id)
					console.log(res)
				}
			})
		  break;
		  case 2:
			App.post({
				url:this.data.item.izfollow == 0 ?'articleUser/confirm':'articleUser/cancel',
				data:{
					type:type,
					articleId:this.data.item.id
				},
				success:(res)=>{
					console.log(res)
					this.getItem(this.data.item.id)
				}
			})
		  break;
		  case 3:
			App.post({
				url:'articleUser/confirm',
				
				loginTs:false,
				data:{
					type:3,
					articleId:this.data.item.id
				},
				success:(res)=>{
					this.getItem(this.data.item.id)
				}
			})
		  break;
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
  onShareAppMessage() {
      return {
        title: '新闻详情',
        path: '/pages/index/details/details?id='+this.data.item.id
      }
  },
})