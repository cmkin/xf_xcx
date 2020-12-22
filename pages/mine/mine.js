// pages/mine/mine.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	itemList:[
		{
			text:'我的历史',
			link:'./history/history',
			top:true,
			iShow:true
		},
		{
			text:'我的处理',
			link:'./handle/handle',
			iShow:true
		},
		{
			text:'我的核对',
			link:'',
			iShow:true
		},
		{
			text:'关于我们',
			link:'./about/about',
			iShow:true,
			nocheak:true,
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
			event:'lgout'
		}
	],
	infos:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log(options)
	/* wx.getUserInfo({
		success:(res)=>{
			console.log(res)
		},
		fail(err){
			console.log(err)
		}
	}) */
  },
  init(){
	  App.post({
		  url:'user/getCurrentUser',
		  data:{},
		  method:"GET",
		  loginTs:false,
		  success:(res)=>{
			  this.setData({
				  infos:res
			  })
		  },
		  error:(e)=>{
			  this.setData({
					infos:false
			  })
		  }
	  })
  },
  goInfo(){
	  wx.navigateTo({
		  url:'./info/info?infos=' + encodeURIComponent(JSON.stringify(this.data.infos))
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
		if(item.link){
			if(this.data.infos || item.nocheak){
				wx.navigateTo({
					url:item.link + '?infos=' + encodeURIComponent(JSON.stringify(this.data.infos))
				})
			}else{
				wx.showModal({
					title: '提示',
					content: '请先去登录',
					success(res) {
						if (res.confirm) {
							wx.navigateTo({
								url: "/pages/login/login"
							})
						} else if (res.cancel) {
							
						}
					}
				})
			}
			
			return
		}
		if(item.event=='lgout'){
			wx.showModal({
				title: '提示',
				content: '确定要退出登陆吗?',
				success:(res)=>{
					
						
					if (res.confirm) {
						
						App.globalData.token = null
						wx.removeStorage({
							key:'token'
						})
						let lists = App.globalData.userList
						let infos = this.data.infos	
						let index = lists.findIndex(item=>item.sysUser.id == infos.id)
							lists.splice(index,1)
							
							wx.getStorage({
								key: "userList",
								data:lists
							})
						
						wx.navigateTo({
							url: "/pages/login/login"
						})
						
					} else if (res.cancel) {
						
					}
				}
			})
		}
		
  },
  gologin(){
	  wx.navigateTo({
		  url:"/pages/login/login"
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
		this.init()
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