<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="/">Navbar</a>
			<button class="navbar-toggler" type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<router-link class="nav-link" :to="{ name: 'home'}">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link"
						             :to="{ name: 'upload' }">
							Upload
						</router-link>
					</li>
				</ul>
			</div>
			<ul class="navbar-nav ml-auto" v-if="!this.user">
				<li class="nav-item">
					<router-link class="nav-link"
								 :to="{ name: 'register'}">
						Register
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link"
								 :to="{ name: 'login' }">
						Login
					</router-link>
				</li>
			</ul>
			<ul class="navbar-nav ml-auto" v-else>
				<li class="nav-item">
					<a class="nav-link" href="" @click="logout()" >Logout</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import eventBus from '../utils/eventBus';

export default {
	name: 'Navbar',
	data: () => ({
		user: false,
	}),
	mounted() {
		this.user = localStorage.getItem('user');
		eventBus.$on('login', () => {
			this.user = true;
		});
		eventBus.$on('logout', () => {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		});
	},
	methods: {
		logout() {
			eventBus.$emit('logout');
		},
	},
};
</script>
