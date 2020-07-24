import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import Vue from 'vue';
import Moment from 'vue-moment';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';

import router from './router';
import App from './App.vue';

Vue.prototype.$http = axios;
Vue.prototype.$serverApiLink = 'http://localhost:8001/api';

Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);
Vue.use(Moment);
Vue.config.productionTip = false;

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			// eslint-disable-next-line no-param-reassign
			config.headers.Authorization = `Bearer ${token}`;
		}
		// eslint-disable-next-line no-param-reassign
		config.headers.Accept = 'application/json';
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
