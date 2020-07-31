<template>
	<div class="container mt-5">
		<div class="card bg-dark text-white">
			<div class="card-header">
				Create Room
			</div>
			<div class="card-body">
				<form @submit.prevent="onSubmit">
					<div class="form-group">
						<input v-model='name'
						       type="text"
						       class="form-control"
						       placeholder="Enter the name of the room"
						       required>
					</div>
					<div class="form-group">
						<input v-model='password'
						       type="password"
						       class="form-control"
						       placeholder="Enter the password of the room"
						>
						<small id="passwordHelp" class="form-text text-white">
							Password is optional
						</small>
					</div>
					<div class="form-group">
						<input v-model='sizeLimit'
						       type="number"
						       class="form-control"
						       placeholder="Enter the limit of player in the room"
						       max="100"
						       @input="sizeLimitMax"
						       required
						>
					</div>
					<div class="form-group">
						<input v-model='scoreLimit'
						       type="number"
						       class="form-control"
						       placeholder="Enter the score limit to win"
						       max="300"
						       @input="scoreLimitMax"
						       required
						>
					</div>
					<div class="form-group">
						<select v-model='answerNb' class="form-control" id="answerNumber" required>
							<option :value="0" selected disabled>Please selects the answer number you want</option>
							<option :value="4">4 answers</option>
							<option :value="8">8 answers</option>
							<option :value="16">16 answers</option>
							<option :value="32">32 answers</option>
						</select>
					</div>
					<button type="submit" class="ml-auto btn btn-success">
						Submit
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import profile from '../../utils/profile';
import to from '../../utils/to';
import notify from '../../utils/notify';

export default {
	name: 'RoomCreate',
	data: () => ({
		name: null,
		password: null,
		sizeLimit: null,
		scoreLimit: null,
		answerNb: 0,
	}),
	methods: {
		async onSubmit() {
			const [err, response] = await to(this.$http.post('/games', {
				name: this.name,
				active: true,
				password: this.password,
				sizeLimit: Number(this.sizeLimit),
				scoreLimit: Number(this.scoreLimit),
				answerNb: Number(this.answerNb),
				owner: `/api/users/${profile.id}`,
			}));

			if (err) {
				return notify('Error !', 'Room cannot be created', 'error');
			}

			notify('Success !', 'Room created', 'success');

			return this.$router.push(`/room/${response.data.id}`);
		},
		scoreLimitMax() {
			if (this.scoreLimit > 300) {
				this.scoreLimit = 300;
			}
		},
		sizeLimitMax() {
			if (this.sizeLimit > 100) {
				this.sizeLimit = 100;
			}
		},
	},
};
</script>

<style scoped>

</style>
