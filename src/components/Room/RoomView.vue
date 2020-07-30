<template>
	<div class="container mt-3">
		<button class="btn btn-light" @click="fetchRooms">
			<i class="fas fa-sync-alt"></i>
		</button>
		<div v-if="rooms.length" class="d-flex flex-row justify-content-between flex-wrap">
			<div v-for="r in rooms" :key="r['@id']">
				<div class="card">
					<div class="card-header">
						<div class="card-title">{{ r.name }}</div>
					</div>
					<div class="card-body">
						Size Limit : {{ r.sizeLimit }}
						Score Limit : {{ r.scoreLimit }}
						Answer Number : {{ r.answerNb }}
					</div>
					<div class="card-footer">
						Propriétaire de la room : {{ r.owner }}
					</div>
				</div>
			</div>
		</div>
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
