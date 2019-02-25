import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';

import OrderList from '@/components/OrderList';
import Coupon from '@/components/Coupon';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },

    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      components: {
        default: Dashboard,
        orderlist: OrderList,
      },
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },

        },
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList,
          mata: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          mata: { requiresAuth: true },
        }

      ]
    },
  ],
});