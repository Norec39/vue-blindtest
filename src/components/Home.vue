<template>
	<div>
		<h1>Homepage</h1>
	</div>
</template>

<script>
import eventBus from '../utils/eventBus';

export default {
	name: 'Home',
	data: () => ({}),
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

<style scoped>

</style>
