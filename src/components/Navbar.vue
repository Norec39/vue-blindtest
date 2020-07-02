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
                </ul>
            </div>
            <div>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link"
                                v-if="!this.user"
                                :to="{ name: 'login'}">
                            Login
                        </router-link>
                        <a class="nav-link" @click="logout()">Logout</a>
                    </li>
                </ul>
            </div>
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
