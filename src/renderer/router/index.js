import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'valkryja-servant',
      component: require('@/components/room').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
