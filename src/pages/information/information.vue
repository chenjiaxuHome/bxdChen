<template>
		<div class="information">
			<ul class="information-list">
				<li class="information-item">
					<div>姓名</div>
					<input class="information-item-input" type="text" v-model="name" placeholder="请输入" />
				</li>
				<li class="information-item">
					<div>身份证号</div>
					<input class="information-item-input" v-model="idnumber" type="text" placeholder="请输入"  maxlength="18"/>
				</li>
				<li class="information-item">
					<div>手机号</div>
					<input class="information-item-input"  disabled="disabled" v-model="iphonenumber" type="text" placeholder="请输入" maxlength="11" />
				</li>
				<li class="information-item">
					<div>职业身份</div>
					<div class="multiselect"  @click="handleClick">
						<span>{{value}}</span>
						<span class="triangle"></span>
					</div>
				</li>
				<li class="information-item">
					<div>有无信用卡</div>
					<div class="multiselect" @click="handleClickCrat">
						<span>{{creditCard}}</span>
						<span class="triangle"></span>
					</div>
				</li>
				<li class="information-item">
					<div>手机使用时间</div>
					<div  class="multiselect" @click="handleClickiphone">
						<span>{{useTime}}</span>
						<span class="triangle"></span>
					</div>
				</li>
			</ul>
			<div class="submit-center" @click="modify">
				<div class="submit">保存</div>
			</div>
		
			<div class="big" v-show="bigOne" @click="bighidOne"></div>
			<div class="big" v-show="bigTwo" @click="bighidTwo"></div>
			<div class="big" v-show="bigThree" @click="bighidThree"></div>
			<mt-popup
	            class="popup"
	            v-model="popupVisible"
	            position="bottom">
	            <div class="taber">
	                <span class="cancel" @click="shut">取消</span>
	                <span @click="changenumber" class="determine">确定</span>
	            </div>
	            <mt-picker 
	                :slots="slots"
	                @change="onValuesChange"
	                class="picker"
	                >
	            </mt-picker> 
	        </mt-popup>

	        <mt-popup
	            class="popup"
	            v-model="popupCreditCard"
	            position="bottom">
	            <div class="taber" >
	                <span class="cancel" @click="Twoshut">取消</span>
	                <span @click="changeTwonumber" class="determine">确定</span>
	            </div>
	            <mt-picker 
	                :slots="reditCard"
	                @change="TwoChange"
	                class="picker"
	                >
	            </mt-picker> 
	        </mt-popup> 

	        <mt-popup
	            class="popup"
	            v-model="popupiphone"
	            position="bottom">
	            <div class="taber">
	                <span class="cancel" @click="Threeshut">取消</span>
	                <span @click="changeThreenumber" class="determine">确定</span>
	            </div>
	            <mt-picker 
	                :slots="iponechange"
	                @change="Threechange"
	                class="picker"
	                >
	            </mt-picker> 
	        </mt-popup> 
    </div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import axios from "axios"
	export default {
		data() {
			return {
				name: "",
				idnumber: "",
				iphonenumber: "",
				creditCard:"请选择",	//有无信用卡
				useTime: "请选择",   //手机使用时间
				popupVisible: false,
				popupCreditCard: false,
				popupiphone: false,
				bigOne: false,
				bigTwo: false,
				bigThree: false,
				item: "",
				itemtwo: "",
				itemThree: "",
				value: "请选择",
				slots:[{values: ['请选择', '打工族', '企业主', '个体户', '自由职业']}],
				reditCard:[{values: ['请选择','有', '无']}],
				iponechange:[{values: ['请选择', '1~5个月', '6个月以上']}]
			}
		},
		mounted() {
			this.name=window.localStorage.userName
			this.idnumber=window.localStorage.idCard    		
			this.value=window.localStorage.careerType    	
			this.creditCard=window.localStorage.isCreditcard   
			var phone=localStorage.phoneNum;
			this.iphonenumber = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			if(window.localStorage.ioponeNumber) {
				this.useTime = window.localStorage.ioponeNumber
			}
		},
		methods: {
			handleClick() {
                    this.popupVisible = true    //打开弹出框
                    this.bigOne = true;
            },
            onValuesChange(picker,values) {
                    this.item = values[0]   //通过change事件存一个数据
            },
            changenumber() {
                    this.value = this.item; //点击的时候附给页面上面的数据
                    this.popupVisible = false;  //关闭弹出框
                    this.bigOne = false;
            },
            shut() {
                    this.value = this.item;
                    this.popupVisible = false;  //关闭弹出框
                    this.bigOne = false;  
            },
            bighidOne() {
            		this.value = this.item;
                    this.popupVisible = false;  //关闭弹出框
                   	this.popupCreditCard = false
					this.popupiphone = false
                    this.bigOne = false    //关闭透明的div
                    this.bigTwo = false
                    this.bigThree = false
            },

            handleClickCrat() {     //第二个弹出框
	            	this.popupCreditCard = true    //打开弹出框
	                this.bigTwo = true;
            },
            TwoChange(picker,values) {

                    this.itemtwo = values[0]   //通过change事件存一个数据
            },
            changeTwonumber() {
                    this.creditCard = this.itemtwo; //点击的时候附给页面上面的数据
                    this.popupCreditCard = false;  //关闭弹出框
                    this.bigTwo = false;
            },
            Twoshut() {
                    this.creditCard = this.itemtwo;
                    this.popupCreditCard = false;  //关闭弹出框
                    this.bigTwo = false;  
            },
            bighidTwo() {
            		this.creditCard = this.itemtwo;
                    this.popupVisible = false;  //关闭弹出框
                   	this.popupCreditCard = false
					this.popupiphone = false
                    this.bigOne = false    //关闭透明的div
                    this.bigTwo = false
                    this.bigThree = false
            },


            handleClickiphone() {    //第三个框
            		this.popupiphone = true    //打开弹出框
                	this.bigThree = true;
            },
            Threechange(picker,values) {
                    this.itemThree = values[0]   //通过change事件存一个数据
            },
            changeThreenumber() {
                    this.useTime = this.itemThree; //点击的时候附给页面上面的数据
                    this.popupiphone = false;  //关闭弹出框
                    this.bigThree = false;
            },
            Threeshut() {
                    this.useTime = this.itemThree;
                    this.popupiphone = false;  //关闭弹出框
                    this.bigThree = false;  
            },
            bighidThree() {
            		this.useTime = this.itemThree;
                    this.popupVisible = false;  //关闭弹出框
                   	this.popupCreditCard = false
					this.popupiphone = false
                    this.bigOne = false    //关闭透明的div
                    this.bigTwo = false
                    this.bigThree = false
            },

            modify() {

	            	if(this.name.length<=1) {
	            		MessageBox.alert('名字输入不正确').then(action => {});
	            		return 0
	            	}
	            	var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
	            	if(!reg.test(this.idnumber)) {
	            		MessageBox.alert('身份证号不正确').then(action => {});
	            		return 0
		 			}
	            	localStorage.setItem("isCreditcard" , this.creditCard) //是否有信用卡
	            	localStorage.setItem("careerType", this.value) 		//类型
	            	localStorage.setItem("userName", this.name)
	            	localStorage.setItem("idCard", this.idnumber)
	            	window.localStorage.ioponeNumber = this.useTime		
	            	this.useTime = window.localStorage.ioponeNumber   //存时间
	            	localStorage.setItem("localStorage", this.useTime)   //改时间  
	            	this.token = localStorage.lastId
		 					var params = new URLSearchParams()
							params.append("userName",this.name)
							params.append("idCard",this.idnumber)
							params.append("careerType",this.value)
							params.append("isCreditcard",this.creditCard)
							params.append("token",this.token)
		 					axios.post("/api/bxd_inf_v2/inf/sys/setUserMsg", params)  //给后端发送验证码
				        	.then(function (response) {
				        		if(response.status == 200) {
				            		/*window.localStorage.userName=this.name
			        				window.localStorage.idCard=this.IdNumber    	
			        				window.localStorage.careerType=this.identitys	//qiye
			        				window.localStorage.isCreditcard=this.Choices */ //you
			        				this.$router.push({path: '/'})
				                }
				        	}.bind(this))
				        	.catch(function (error) {
				            	console.log(error);
				        	});
            }

		}

	}
</script>


<style scoped>
	.information-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.1rem;
		padding: 0 0.36rem;
		background: #fff;
		height: 0.9rem;
		align-items: center;
	}
	.information-item-input {
		border: 0;
		height: 100%;
		text-align: center;
		background: #fff;
	}
	.multiselect {
		position: relative;
		width: 1.91rem;
		height: 0.5rem;
		border: 1px solid #b2b2b2;
		line-height: 0.5rem;
		padding-left: 0.15rem;
	}
	.triangle {
		position: absolute;
		right: 0.16rem;
		top: 0.2rem;
		width: 0;
    	height: 0;
    	border-left: 7px solid transparent;
    	border-right: 7px solid transparent;
    	border-top: 10px solid #b2b2b2;
	}
	.submit-center {
		display: flex;
		justify-content: center;

	}
	.submit {
		width: 5.3rem;
		height: 0.7rem;
		border-radius: 0.1rem;
		background: #e59b35;
		text-align: center;
		margin-top: 1.3rem;
		line-height: 0.7rem;
		color: #fff;
	}

	.popup {
        width: 100%;
    }
    .taber {
        height: 0.6rem;
        background: #f0f0f2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
    }
    .picker {
        width: 100%;
   }
    .determine {
        color: #4695d6;
    }
    /* big */
    .big {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
    }
</style>
<style>
    .picker-slot.picker-slot-center {
        width: 100%;
    }
    .picker-slot.picker-slot-center {
        background: #d1d4dd;
    }
    .v-modal {
        /* opacity: 0!important; */
        z-index:0!important;
        display: none!important;
    }
    .mint-popup .popup .mint-popup-bottom {
		position: fixed!important;
		z-index: 99!important;
    }
</style>