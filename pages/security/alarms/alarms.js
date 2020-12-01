// pages/index/alarms/alarms.js
Component({
	properties:{
		otherlists:{
			type:Array,
			value:[]
		}
	},
	lifetimes:{
		show(){
			console.log('显示')
		}
	},
	/**
	 * 页面的初始数据
	 */
	data: {
		tabActive: 1,
		time: null,
		sblist: ['电气火灾监控报警', '可燃气体报警'],
		sbindex: null,
		inputValue:''
	},
	

	methods:{
		inputChange(e){
			this.setData({
				inputValue:e.detail.value
			})
		},
		changeTab(e) {
			let type = e.target.dataset.type
			this.setData({
				tabActive: type
			})
		
		},
		bindDateChange(e) {
			this.setData({
				time: e.detail.value
			})
		},
		bindSbChange(e) {
			this.setData({
				sbindex: e.detail.value
			})
		},
		godetails(e){
			let item = e.currentTarget.dataset.item
			wx.navigateTo({
				url: "./details/details?item=" + encodeURIComponent(JSON.stringify(item))
			})
		},
		search(){
			let value = ''
			switch(this.data.tabActive){
				case 1:
					value = this.data.inputValue
				break;
				case 2:
					value = this.data.time
				break;
				case 3:
					value = this.data.sbindex
				break;
			}
			this.triggerEvent ( 'formOther' , {
					type:this.data.tabActive,
					value:value
			})
		},
	},
	

})
