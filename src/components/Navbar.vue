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
					<li class="nav-item" v-if="user">
						<router-link class="nav-link"
												 :to="{ name: 'roomList' }">
							Room
						</router-link>
					</li>
					<li class="nav-item" v-if="user">
						<router-link class="nav-link"
												 :to="{ name: 'upload' }">
							Upload
						</router-link>
					</li>
					<div v-if="user">
						<li class="nav-item" v-if="checkAdmin">
							<router-link class="nav-link"
													 :to="{ name: 'categoriesList' }">
								Categories
							</router-link>
						</li>
					</div>
				</ul>
			</div>
			<ul class="navbar-nav ml-auto" v-if="!user">
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
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle"
						 id="navbarDropdown"
						 role="button"
						 data-toggle="dropdown">
						Bonjour {{ username }}
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<router-link class="dropdown-item"
												 :to="{ name: 'profile' }">
							<i class="fa fa-user"></i> Profile
						</router-link>
						<a class="dropdown-item"
							 href=""
							 :to="{ name: 'login' }"
							 @click="logout()">
							<i class="fa fa-door-closed"></i> Logout
						</a>
					</div>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import eventBus from '../utils/eventBus';
import profile from '../utils/profile';
import notify from '../utils/notify';

export default {
	name: 'Navbar',
	data: () => ({
		user: false,
		username: null,
	}),
	mounted() {
		this.user = localStorage.getItem('user');
		this.username = profile.username;

		eventBus.$on('login', () => {
			this.user = true;
		});
		eventBus.$on('logout', () => {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.removeItem('user_profile');
			this.user = false;
			this.$router.push('/login');
		});
		eventBus.$on('successfulUpdate', () => notify(
			'Success !',
			'You have successfully uploaded the song!',
			'success',
		));
	},
	methods: {
		logout() {
			eventBus.$emit('logout');
		},
	},
	computed: {
		checkAdmin() {
			return JSON.parse(localStorage.getItem('user_profile'))
					?.role
					.includes('ROLE_ADMIN');
		},
	},
};
</script>
