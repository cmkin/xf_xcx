//app.js
App({
	onLaunch: function() {

		wx.login({
			success: (res) => {
				if (res.code) {
					this.globalData.code = res.code
				} else {
					wx.showToast({
						title: "登陆失败",
						icon: "none",
						duration: 2000
					})
				}
			}
		})
		
		

		wx.getStorage({
			key: "token",
			success: (res) => {
				this.globalData.token = res.data
			}
		})
		wx.getStorage({
			key: "userList",
			success: (res) => {
				this.globalData.userList = res.data
			}
		})

	},
	saveUser(res){
		this.globalData.token = res.token
		this.globalData.userInfo = res.sysUser
		wx.setStorage({
		  key:"token",
		  data:res.token
		})
		
		let has = -1
		
		
		
		if(res.sysUser==null){
			return
		}else{
			has =  this.globalData.userList.findIndex(item=>{
				return item.sysUser.id == res.sysUser.id	
			})
		}
		
		
		
		
		 console.log(this.globalData.userList)
	
			if(has>=0){
				this.globalData.userList[has] = res
			}else{
				this.globalData.userList.push(res)
			}
		wx.setStorage({
		  key:"userList",
		  data:this.globalData.userList
		})
	},
	cheakLogin: function(cancel) {
		if (this.globalData.token == null) {
			wx.showModal({
				title: '提示',
				content: '请先去登录',
				success(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: "/pages/login/login"
						})
					} else if (res.cancel) {
						if (cancel) {
							cancel()
						}
					}
				}
			})

			return false
		}

		return true
	},
	post: function(optings) {

		let ops = {
			urls: optings.url.indexOf("http")>=0 ? optings.url : 'http://console.tjlinux.cn:9088/jeecg-boot/app/' + optings.url,
			data: {},
			token: true,
			loginTs: true,
			method: "POST",
			complete: function() {
				wx.hideLoading()
			},
			dsuccess: (res) => {
				if (res.data.code == 200) {
					//成功
					optings.success(res.data.result)
				} else if (res.data.status == 500 && res.data.message.indexOf('Token失效') >= 0) {
					//token失效
					if (optings.error) {
						optings.error(res.data)
					}else{
						wx.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 3000
						})
					}
					
					wx.removeStorage({
						key: 'token'
					})
					this.globalData.token = null
				} else {
					//其他错误
					if (optings.error) {
						optings.error(res.data)
						return
					}

					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 3000
					})


				}

			},
			error: function(err) {
				wx.showToast({
					title: "网络错误~",
					icon: 'none',
					duration: 2000
				})
			},
			...optings,
		}


		if (ops.token && this.globalData.token == null) {
			if (ops.loginTs) {
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

				return
			}




		}

		wx.showLoading()
		wx.request({
			url: ops.urls,
			data: ops.data,
			header: {
				"content-type": "application/json",
				"X-Access-Token": ops.token ? this.globalData.token : null
			},
			method: ops.method,
			complete: ops.complete,
			success: ops.dsuccess,
			error: ops.error
		})
	},
	globalData: {
		userInfo: null,
		token: null,
		code: null,
		userList:[]
	}
})
