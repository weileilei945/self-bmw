import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
  },
  {
    path: '/car',
    name: 'Car',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/user.vue')
  },
  {
    path: '/cartype',
    name: 'CarType',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/car-type.vue')
  },
  {
    path: '/dodge',
    name: 'Dodge',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/dodge.vue')
  },
  {
    path: '/bmw',
    name: 'Bwm',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/bmw.vue')
  },
  {
    path: '/benz',
    name: 'Benz',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/benz.vue')
  },
  {
    path: '/Audi',
    name: 'Audi',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/Audi.vue')
  },
  {
    path: '/porsche',
    name: 'Porsche',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/porsche.vue')
  },
  {
    path: '/volkswagen',
    name: 'Volkswagen',
    component: () => import(/* webpackChunkName: "about" */ '../views/car/volkswagen.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/login/email',
    name: 'LoginEmail',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login-email.vue')
  },
  {
    path: '/clause',
    name: 'clause',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/clausePage.vue')
  },
  {
    path: '/noorder',
    name: 'NoOrder',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/no-order.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/order.vue')
  },
  {
    path: '/changeId',
    name: 'changeId',
    component: () => import(/* webpackChunkName: "about" */ '../views/menber/change-id.vue')
  },
  {
    path: '/changePwd',
    name: 'changePwd',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/change-pwd.vue')
  },
  {
    path: '/verfiy-mail',
    name: 'verfiyMail',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/verfiy-mail.vue')
  },
  {
    path: '/bindphone',
    name: 'BindPhone',
    component: () => import(/* webpackChunkName: "about" */ '../views/menber/bindphone.vue')
  },
  {
    path: '/three',
    name: 'three',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/three.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/payment.vue')
  },
  {
    path: '/payResult',
    name: 'payResult',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/payResult.vue')
  },
  {
    path: '/shopcar',
    name: 'ShopCar',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/shop-car.vue')
  },
  {
    //挑战者
    path: '/challenger',
    name: 'Challenger',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/challenger.vue')
  },
  {
    path: '/m4',
    name: 'm4',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/m4.vue')
  },
  {
    path: '/the3',
    name: 'the3',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/The3.vue')
  },
  {
    path: '/ArtGalleryPage',
    name: 'ArtGalleryPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/ArtGalleryPage.vue')
  },
  {
    path: '/ValuesPage',
    name: 'ValuesPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/ValuesPage.vue')
  },
  {
    path: '/footerDetail',
    name: 'footerDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/footerDetail.vue')
  },
  {
    path: '/InvestorsPage',
    name: 'InvestorsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/InvestorsPage.vue')
  },
  {
    path: '/CarEPlusPage',
    name: 'CarEPlusPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/CarEPlusPage.vue')
  },
  {
    path: '/InvestorsFormPage',
    name: 'InvestorsFormPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/InvestorsFormPage.vue')
  },
  {
    path: '/formResult',
    name: 'FormResult',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/formResult.vue')
  },
  {
    path: '/ClubPage',
    name: 'ClubPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/others/ClubPage.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.NODE_ENV == "development" ? '/' : '/mobile',
  routes
})

/**
 * 判断是否为移动设备，是，则跳转到移动端的路径
 */
router.beforeEach((to, from, next) => {
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = 'https://www.achencybe.com/'
    return
  }
  next()
})

router.afterEach((to,from,next) => {
  document.getElementById('app').scrollTop = 0
});

export default router
