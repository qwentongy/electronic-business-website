<template>
  <div class="register">
				<h3>注册新用户
					<span class="go">我有账号，去 <router-link to="/Login" href="login.html">登陆</router-link>
					</span>
				</h3>
				<div class="content">
					<label>手机号:</label>
					<input type="text" placeholder="请输入你的手机号" v-model="phone">
					<span class="error-msg">错误提示信息</span>
				</div>
				<div class="content">
					<label>验证码:</label>
					<input type="text" placeholder="请输入验证码" v-model="code">
					<button @click="getSecurityCode">获取验证码</button>
					<span class="error-msg">错误提示信息</span>
				</div>
				<div class="content">
					<label>登录密码:</label>
					<input type="password" placeholder="请输入你的登录密码" v-model="password">
					<span class="error-msg">错误提示信息</span>
				</div>
				<div class="content">
					<label>确认密码:</label>
					<input type="password" placeholder="请输入确认密码" v-model="password1">
					<span class="error-msg">错误提示信息</span>
				</div>
				<div class="controls">
					<input name="m1" type="checkbox" :checked="isChecked" @click="agreement($event)">
					<span>同意协议并注册《尚品汇用户协议》</span>
					<span class="error-msg">错误提示信息</span>
				</div>
				<div class="btn">
					<button @click="Register">完成注册</button>
				</div>
			</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Register',
	data() {
		return {
			phone: '',
			code: '',
			password: '',
			password1: '',
			isChecked: false
		}
	},
	methods: {
		// 获取验证码，这里直接把API获取得验证码填上了，正常是发送到用户手机上用户自己填写得
		async getSecurityCode() {
			try {
				await this.$store.dispatch('getSecurityCode',this.phone)
				this.code = this.securityCode
			} catch (error) {
				alert(error.message)
			}
		},
		// 获取用户是否同意协议，同意才能注册
		agreement(e) {
				this.isChecked = e.target.checked
		},
		// 完成注册按钮
		async Register() {
			if (this.isChecked == true) {
				let registerInfo = {phone:this.phone,password:this.password,code:this.code}
				try {
					await this.$store.dispatch('Register',registerInfo)
					this.$router.push({
						name: 'Login'
					})
				} catch (error) {
					alert(error.message)
				}
			} else {
				alert('请同意协议')
			}
		}
	},
	computed: {
		...mapState({
			// 验证码
			securityCode: state => state.User.securityCode
		})
	}
}
</script>

<style lang="less" scoped>
    .register {
	width: 1200px;
	height: 445px;
	border: 1px solid rgb(223, 223, 223);
	margin: 0 auto;

	h3 {
		background: #ececec;
		margin: 0;
		padding: 6px 15px;
		color: #333;
		border-bottom: 1px solid #dfdfdf;
		font-size: 20.04px;
		line-height: 30.06px;

		span {
			font-size: 14px;
			float: right;

			a {
				color: #e1251b;
			}
		}
	}

	div:nth-of-type(1) {
		margin-top: 40px;
	}

	.content {
		padding-left: 390px;
		margin-bottom: 18px;
		position: relative;

		label {
			font-size: 14px;
			width: 96px;
			text-align: right;
			display: inline-block;
		}

		input {
			width: 270px;
			height: 38px;
			padding-left: 8px;
			box-sizing: border-box;
			margin-left: 5px;
			outline: none;
			border: 1px solid #999;
		}

		img {
			vertical-align: sub;
		}

		.error-msg {
			position: absolute;
			top: 100%;
			left: 495px;
			color: red;
		}

		button {
			width: 100px;
			height: 38px;
			margin-left: 5px;
		}
	}

	.controls {
		text-align: center;
		position: relative;

		input {
			vertical-align: middle;
		}

		.error-msg {
			position: absolute;
			top: 100%;
			left: 495px;
			color: red;
		}
	}

	.btn {
		text-align: center;
		line-height: 36px;
		margin: 17px 0 0 55px;

		button {
			outline: none;
			width: 270px;
			height: 36px;
			background: #e1251b;
			color: #fff !important;
			display: inline-block;
			font-size: 16px;
		}
	}
}

.copyright {
	width: 1200px;
	margin: 0 auto;
	text-align: center;
	line-height: 24px;

	ul {
		li {
			display: inline-block;
			border-right: 1px solid #e4e4e4;
			padding: 0 20px;
			margin: 15px 0;
		}
	}
}

</style>