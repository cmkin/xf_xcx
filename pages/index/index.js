// pages/index/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	cdList:[
		{
			icon:'/images/icon-1.png',
			text:"设施状态",
			link:'./facilities/facilities'
		},
		{
			icon:'/images/icon-2.png',
			text:"其他信息",
			link:'./otherInfo/otherInfo'
		},
		{
			icon:'/images/icon-3.png',
			text:"联网单位",
			link:'./company/company'
		},
		{
			icon:'/images/icon-4.png',
			text:"物联巡查",
			link:''
		},
		{
			icon:'/images/icon-5.png',
			text:"设备管理",
			link:''
		},
		{
			icon:'/images/icon-6.png',
			text:"视频监控",
			link:''
		}
		
	],
	
	newlists:[],
	
	policeCount:{
		notHandleCount: 0,
		handleCount: 0
	},
	
	banner:[]
	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.init()
  },
  init(){
	  App.post({
	  	url:'article/list',
	  	method:"GET",
		token:false,
	  	success:(res)=>{
			this.setData({
				newlists:res.records
			})
	  	}
	  })
	  App.post({
		  url:'rotation/list',
		  method:"GET",
		  token:false,
		  success:(res)=>{
		  	this.setData({
		  		banner:res
		  	})
		  }
	  })
  },
  
  godetail(e){
	  let id = e.currentTarget.dataset.id
	
	  wx.navigateTo({
		  url:"./details/details?id="+id
	  })
  },
  goAll(){
	  wx.switchTab({
		url:"/pages/security/security"
	  })
  },
  goLink(e){
	  let item = e.currentTarget.dataset.item
	  if(item.link==''){
		  wx.showToast({
			  title:"建设中，敬请期待！",
			  icon:"none"
		  })
		  return
	  }
		wx.navigateTo({
			url:item.link
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
	App.post({
		url:'police/getPoliceCount',
		data:{},
		method:"GET",
		loginTs:false,
		success:(res)=>{
			this.setData({
				policeCount:{
					notHandleCount: res.notHandleCount,
					handleCount: res.handleCount
				}
			})
		},
		error:(res)=>{}
	})
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