import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'
import Login from '@/components/Login'
import LiveBroadcart from '@/components/LiveBroadcart'
import Money from '@/components/Money'
import Binding from "@/components/Binding"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/live',
      name: 'LiveBroadcart',
      component: LiveBroadcart
    },
    {
      path: '/money',
      name: 'Money',
      component: Money
    },
    {
      path: '/binding',
      name: 'Binding',
      component: Binding
    },
  ]
})
