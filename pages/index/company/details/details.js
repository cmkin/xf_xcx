// pages/index/company/details/details.js



Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		latitude: 23.096994,
		longitude: 113.324520,
		markers: [{
			id:0,
			latitude:23.096994,
			longitude: 113.324520,
			/* callout:{
				content:"居然之家",
				bgColor:'#FF6565',
				color:"#fff"
			} */
		}],
		customCalloutMarkerIds: [],
		num: 1,
		
		openFlag:false,
		detailsFlag:true,
		
		item:{},
		juli:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let item = JSON.parse(decodeURIComponent(options.item))
		this.setData({
			item: item,
			latitude: item.lat,
			longitude: item.lon,
			markers:[
				{
				  id:0,
				  latitude:item.lat,
				  longitude: item.lon,
				}
			]
		})
		
			
			
			//进行经纬度转换为距离的计算
			  function Rad(d){
			       return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
			  }
			 
			  /*
			   计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
			   默认单位km
			  */
			  function getMapDistance(lat1,lng1,lat2,lng2) {
			    var radLat1 = Rad(lat1);
			    var radLat2 = Rad(lat2);
			    var a = radLat1 - radLat2;
			    var  b = Rad(lng1) - Rad(lng2);
			    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
			    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
			    s = s *6378.137 ;// EARTH_RADIUS;
			    s = Math.round(s * 10000) / 10000; //输出为公里
			    //s=s.toFixed(2);
			    return s;
			
			 }
			
		 //获取当前坐标
		    let that = this;
		    wx.getLocation({
		      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		      success: function (res) {
		        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
		        that.setData({
					juli:getMapDistance(latitude,longitude,item.lat,item.lon)
				})
		      }
		    });
			
			
		
	},
	openM(){
		this.setData({
			openFlag:!this.data.openFlag
		})
	},
	markertap(){
		this.setData({
			detailsFlag:true
		})
	},
	phoneCall(){
		wx.makePhoneCall({
		  phoneNumber: this.data.item.tel //仅为示例，并非真实的电话号码
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function(e) {
		this.mapCtx = wx.createMapContext('map')
		
	},
	
	 addMarker() {
	    const markers = allMarkers
	    this.setData({
	      markers,
	      customCalloutMarkerIds: [2,3,4],
	    })
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
