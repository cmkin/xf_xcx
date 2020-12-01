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
			urls: 'http://console.tjlinux.cn:9088/jeecg-boot/app/' + optings.url,
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
		token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDY4Mjc1NzIsInVzZXJuYW1lIjoidGVzdCJ9.eFxfZHOadM2c1gcCUhH-CSTsKSlhklhygI71CdSXGho',
		code: null
	}
})
