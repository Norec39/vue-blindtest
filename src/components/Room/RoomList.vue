<template>
	<div class="container mt-3">
		<button class="btn btn-light" @click="fetchRooms">
			<i class="fas fa-sync-alt"></i>
		</button>
		<div v-if="rooms.length" class="d-flex flex-row justify-content-around flex-wrap mt-4">
			<div v-for="r in rooms" :key="r['@id']">
				<div v-if="r.active" class="card mb-2">
					<div class="card-header">
						<div class="card-title">{{ r.name }}</div>
					</div>
					<div class="card-body">
						Size Limit : {{ r.sizeLimit }} <br>
						Score Limit : {{ r.scoreLimit }} <br>
						Answer Number : {{ r.answerNb }}
					</div>
					<div class="card-footer">
						<div v-if="r.password">
							<button class="btn btn-success" disabled>
								Entrer dans la room
							</button>
						</div>
						<router-link v-else
												 class="btn btn-success"
												 :to="{ name: 'roomView', params: { id: r.id } }">
							Entrer dans la room
						</router-link>
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
			const [err, response] = await to(this.$http.get('/games'));

			if (err) {
				return notify('Error !', 'Can\'t find rooms', 'error');
			}
			this.rooms = response.data;
			return true;
		},
	},
};
</script>
