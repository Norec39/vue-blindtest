<template>
	<div>
		<categories />
	</div>
</template>

<script>
import eventBus from '../utils/eventBus';
import Categories from './Categories.vue';

export default {
	name: 'Home',
	components: {
		Categories,
	},
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
	comments: {
		Categories,
	},
};
</script>

<style scoped>

</style>
