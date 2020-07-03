import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Security/Login.vue';
import Register from './components/Security/Register.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
