// pages/index/facilities/nextstate/nextstate.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	item:{},
	updateTime:'',
	tabList:[
		
	],
	moreList:[
		
	],
	active:{
		moreFlag:false,
		alert:false,
		tab:1,
		more:1
	},
	id:null,
	id2:null,
	title:null,
	title2:null,
	
	
	nowItem:{},
	ztlists:[]
	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	// options = {item: '{"title":"自喷系统","id":0,"title2":"湿式自喷","type":2}'}

	function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

	 let item = JSON.parse(options.item)
		console.log(item)
		if(item.type==1){
			wx.setNavigationBarTitle( {
				title:item.title
			})
			this.setData({
				id:item.id,
				title:item.title
			})
		}else{
			wx.setNavigationBarTitle({
				title:item.title+"-"+item.title2
			})
			this.setData({
				id:item.id,
				id2:item.id2,
				title:item.title,
				title2:item.title2,
				updateTime:dateFormat('YYYY-mm-dd HH:MM:SS',new Date())
			})
		}
		this.setData({
			item:item
		})
		
		//this.getZjDetails()
		this.getChildList()
  },
  
  formSubmitType(e){
	  let form = e.detail.value
			App.post({
				url:'deviceStatus/handleStatus',
				data:{
					companyCode:this.data.item.item.orgCode,
					categoryCId:this.data.id2 ? this.data.id2 : this.data.id,
					componenCode:this.data.nowItem.id2,
					...form
				},
				success:(res)=>{
					wx.showToast({
						title:"核对成功",
						icon:"success"
					})
				}
			})
		this.alertM()
	  console.log(e.detail.value)
	  
  },
  
  getZjDetails(item){
	  
	  App.post({
		  url:"deviceStatus/list",
		  data:{
			  companyCode:this.data.item.item.orgCode,
			  categoryCId:this.data.id2 ? this.data.id2 : this.data.id,
			  componenCode:item.id2
		  },
		  method:"GET",
		  success:(res)=>{
			  this.setData({
				  ztlists:res,
				  nowItem:item
			  })
		  }
	  })
  },
  getChildList(){
	  App.post({
		  url:"category/getChildList",
		  data:{
			  id:this.data.id2?this.data.id2:this.data.id
		  },
		  method:"GET",
		  success:(res)=>{
		  		if(res.length<3){
					this.setData({
						tabList:res.map(item=>{
							return{
								id:item.id,
								id2:item.itemValue,
								text:item.itemText
							}
						}),
						moreList:[]
					})
				}else{
					this.setData({
						tabList:res.slice(0,3).map(item=>{
							return{
								id:item.id,
								id2:item.itemValue,
								text:item.itemText
							}
						}),
						moreList:res.slice(3,res.length).map(item=>{
							return{
								id:item.id,
								id2:item.itemValue,
								text:item.itemText
							}
						})
					})
				}
				  
				  this.setData({
				  	'active.tab':this.data.tabList[0].id,
				  	'active.more':0,
				  })
				 this.getZjDetails(this.data.tabList[0])
		  }
	  })
  },
  changeItem(e){
	  let item = e.currentTarget.dataset.item
	  let type = e.currentTarget.dataset.type
		if(type==1){
			this.setData({
				'active.tab':item.id,
				'active.more':0,
			})
		}else{
			this.setData({
				'active.more':item.id,
				'active.tab':0
			})
		}
		this.getZjDetails(item)
		console.log(item)
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