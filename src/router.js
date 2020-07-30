import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Security/Login.vue';
import Register from './components/Security/Register.vue';
import Upload from './components/Upload/Upload.vue';
import Profile from './components/Profile/Profile.vue';
import RoomList from './components/Room/RoomList.vue';
import RoomCreate from './components/Room/RoomCreate.vue';
import RoomView from './components/Room/RoomView.vue';
import CategoriesList from './components/Categories/CategoriesList.vue';
import End from './components/End.vue';

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
	{
		path: '/upload',
		name: 'upload',
		component: Upload,
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile,
	},
	{
		path: '/room-list',
		name: 'roomList',
		component: RoomList,
	},
	{
		path: '/room-create',
		name: 'roomCreate',
		component: RoomCreate,
	},
	{
		path: '/room/:id',
		name: 'roomView',
		component: RoomView,
	},
	{
		path: '/categories',
		name: 'categoriesList',
		component: CategoriesList,
	},
	{
		path: '/end',
		name: 'theEnd',
		component: End,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
