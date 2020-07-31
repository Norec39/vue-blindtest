import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import Vue from 'vue';
import Moment from 'vue-moment';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';

import router from './router';
import App from './App.vue';
import eventBus from './utils/eventBus';

Vue.prototype.$http = axios.create({
	baseURL: 'http://localhost:8000/api',
	headers: {
		Accept: 'application/json',
	},
});

Vue.use(VueSweetalert2);
Vue.use(Moment);
Vue.config.productionTip = false;
Vue.prototype.$http.interceptors.request.use(
	(response) => response, (error) => {
		// eslint-disable-next-line eqeqeq
		if (error.response.data.message === 'Invalid JWT Token') {
			Promise.reject(error);
			eventBus.$emit('logout');
			return router.push('/login');
		}
		return Promise.reject(error);
	},
);

Vue.prototype.$http.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			// eslint-disable-next-line no-param-reassign
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

new Vue({
	axios,
	router,
	render: (h) => h(App),
}).$mount('#app');
