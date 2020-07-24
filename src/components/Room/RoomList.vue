<template>
	<div class="container mt-3">
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
export default {
	name: 'RoomList',
	data: () => ({
		rooms: [],
	}),
	async created() {
		this.fetchRooms();
	},
	methods: {
		fetchRooms() {
			const es = new EventSource(
				'http://localhost:3000/.well-known/mercure?topic=http://localhost:8001/api/games/{id}',
			);
			// eslint-disable-next-line no-shadow
			es.onmessage = ({ data }) => {
				const rooms = JSON.parse(data);
				this.rooms.push(rooms);
			};
		},
	},
};
</script>

<style scoped>

</style>
