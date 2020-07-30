<template>
	<div class="container mt-3">
		<button @click="fetchRooms">
			<i class="fas fa-sync-alt"></i>
		</button>
		<ul v-if="rooms.length">
			<li v-for="r in rooms" :key="r['@id']">
				{{ r.name }}
				{{ r.id }}
			</li>
		</ul>
		<p v-else>No rooms yet !</p>
	</div>
</template>

<script>
import to from '../../utils/to';
import notify from '../../utils/notify';

export default {
	name: 'RoomList',
	data: () => ({
		rooms: [],
	}),
	async created() {
		await this.fetchRooms();
	},
	methods: {
		async fetchRooms() {
			console.log('fetch');
			const [err, response] = await to(this.axios.get(
				`${this.$serverApiLink}/games/`,
			));

			if (err) {
				return notify('Error !', 'Can\'t find rooms', 'error');
			}
			this.rooms = response.data;
			return true;
		},
	},
};
</script>

<style scoped>

</style>
