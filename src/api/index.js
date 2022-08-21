import {
  get,
  post,
} from './axios';

const api = {
  //车系详情
  getCarDetail: function (data = {}) {
    return post('system/series/getCarSeriesByName', data)
  },
  //商务合作表单提交
  saveInvestors: function (data = {}) {
    return post('system/purpose/add', data)
  },
  //上传
  upload: function (data = {}) {
    return post('common/uploads', data)
  },
  //客户详情
  getClientInfo: function (data = {}) {
    return post('system/client/getClientById', data)
  },
  //修改客户信息
  saveClientInfo: function (data = {}) {
    return post('system/client/edit', data)
  },
  //服务商下拉
  getAddressAll: function (data = {}) {
    return post('system/address/getAddressAll', data)
  },
  //服务商列表
  getFacilitatorList: function (data = {}) {
    return post('system/facilitator/getFacilitatorByCityId', data)
  },
  //生成订单编号
  addOrderNumber: function (data = {}) {
    return post('system/goods/getOrderNumber', data)
  },
  //提交订单
  saveOrder: function (data = {}) {
    return post('system/goods/add', data)
  },
  //订单列表
  getOrderList: function (data = {}) {
    return post('system/goods/getOrderGoodsByClientId', data)
  },
  //订单详情
  getOrder: function (data = {}) {
    return post('system/goods/getOrderGoodsById', data)
  },

  //订单列表
  updateOrder: function (data = {}) {
    return post('system/goods/updateOrderGoodsBySyntony', data)
  },

  //发送短信
  sendCode: function (data = {}) {
    return post('system/client/send_sms', data)
  },

  //手机号登录
  loginByPhone: function (data = {}) {
    return post('system/client/login-by-phone', data)
  },
  //手机号登录
  loginByPhonePwd: function (data = {}) {
    return post('system/client/login-by-phone-password', data)
  },

  //邮箱登录
  loginByEmail: function (data = {}) {
    return post('system/client/login-by-email', data)
  },

  //解密ticket
  getUserId: function (data = {}) {
    return post('system/client/decode_ticket', data)
  },

  //检查登陆信息
  verifySticket: function (data = {}) {
    return post('system/client/check_ticket', data)
  },

  //手机号注册
  registeredByPhone: function (data = {}) {
    return post('system/client/register-by-phone', data)
  },

  //邮箱注册
  registeredByEmail: function (data = {}) {
    return post('system/client/register-by-email', data)
  },

  //校验手机号是否被占用
  isUsePhone: function (data = {}) {
    return post('system/client/check-phone', data)
  },

  //校验邮箱是否被占用
  isUseEmail: function (data = {}) {
    return post('system/client/check-email', data)
  },

  //获取首页轮播
  getBanner: function (data = {}) {
    return post('system/replace/getReplaceAll', data)
  },



  //获取微信支付二维码
  getWXPayCode: function (data = {}) {
    return get('wxPay/QrCodePay', data)
  },
  //获取支付宝支付二维码
  getPayState: function (data = {}) {
    return post('system/goods/isPaySuccess', data)
  },
  //查询支付状态
  getZFBPayCode: function (data = {}) {
    return get('aliPay/QrCodePay', data)
  },
}

export default api