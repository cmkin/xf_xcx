// pages/index/inspection/inspection.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uinfos:{},
	times:'',
	sblb:[],
	dwlb:'',
	dwindex:0,
	sbindex:0,
	imgs:[],
	inspectionLocation:'',
	description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 App.post({
		 url:"user/getCurrentUser",
		 method:"GET",
		 success:(res)=>{
			 this.setData({
				 uinfos:res
			 })
			 console.log(res)
		 }
	 })
	 
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
	 
	 this.setData({
		 times:dateFormat("YYYY-mm-dd HH:MM", new Date())
	 })
	 
	 
	 App.post({
				url:"http://console.tjlinux.cn:9088/jeecg-boot/xfdevice/xfDevice/list",
				data:{
					deviceType:1
				},
	 		 method:"GET",
	 		 success:(res)=>{
	 			 this.setData({
	 				 sblb:res.records
	 			 })
	 			 console.log(res)
	 		 }
	 })
	 
	 App.post({
	 		 url:"http://console.tjlinux.cn:9088/jeecg-boot/networking/xfCompany/queryList",
	 		 method:"GET",
	 		 success:(res)=>{
	 			 this.setData({
	 				 dwlb:res
	 			 })
	 			 console.log(res)
	 		 }
	 })
	 
	 
	 
	 
  },
  
   bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        dwindex: e.detail.value
      })
    },
	bindPickerChange2: function(e) {
	   console.log('picker发送选择改变，携带值为', e.detail.value)
	   this.setData({
	     sbindex: e.detail.value
	   })
	 },
	 
	 
	 	changeImg() {
	 		
	 		wx.chooseImage({
	 			count: 1,
	 			sizeType: ['original', 'compressed'],
	 			sourceType: ['album', 'camera'],
	 			success:(res)=>{
	 				// tempFilePath可以作为img标签的src属性显示图片
	 				wx.showLoading()
	 				const tempFilePaths = res.tempFilePaths
	 				wx.uploadFile({
	 					//url: 'http://console.tjlinux.cn:9088/jeecg-boot/app/user/updateUser', //仅为示例，非真实的接口地址
	 					url:'http://console.tjlinux.cn:9088/jeecg-boot/app/file/upload',
	 					filePath: tempFilePaths[0],
	 					name: 'file',
	 					header:{
	 						"X-Access-Token": App.globalData.token,
	 						"content-Type": "multipart/form-data"
	 					},
	 					formData: {
	 						biz:'temp'
	 					},
	 					success:(res)=>{
	 						console.log(res)
	 						wx.hideLoading()
	 						const data = JSON.parse(res.data).message
							let imgs = this.data.imgs
	 						this.setData({
	 							imgs:[...imgs,data]
	 						})		
	 						//do something
	 					},
	 					fail:()=>{
	 						wx.showToast({
	 							title:"上传失败",
	 							icon:"none"
	 						})
	 					}
	 				})
	 
	 			},
	 			
	 		})
	 	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  delImg(e){
	  let index = e.currentTarget.dataset.index
	  let imgs =[...this.data.imgs].filter((tt,ii)=>ii!=index)
		
	  this.setData({
	  	imgs:imgs
	  })
	  console.log(index,imgs)
  },
  inputC(e){
	  let type = e.currentTarget.dataset.type
	  let value = e.detail.value
		 
		 if(type==1){
			 this.setData({
				 inspectionLocation:value
			 })
		 }else{
			 this.setData({
			 	description:value
			 })
		 }
		 
	  console.log(e)
  },
  
  submit(){
	 // wx.showLoading()
	  let json = {
		  deviceCode:this.data.deviceCode,
		  inspectionLocation:this.data.inspectionLocation,
		  inspectionTime:this.data.times,
		  inspectionUser:this.data.uinfos.username,
		  imageUrls:this.data.imgs.join(","),
		  inspectionDept:this.data.dwlb[this.data.dwindex].id,
		  deviceCode:this.data.sblb[this.data.sbindex].deviceCount,
		  
	  }
	  App.post({
		  url:"http://console.tjlinux.cn:9088/jeecg-boot/networking/xfInspection/add",
		  data:json,
		  success:(res)=>{
				//wx.hideLoading()
				setTimeout(()=>{
					wx.showToast({
						title:"添加成功",
						duration:3000
					})
				},1000)

			  
		  }
	  })
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