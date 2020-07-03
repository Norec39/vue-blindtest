<template>
	<div class="container mt-5 pt-5 col-md-4 offset-md-4">
		<div class="card bg-secondary text-white">
			<div class="card-header">
				Register
			</div>
			<div class="card-body">
				<div class="card-text">
					<form @submit.prevent="onSubmit">
						<div class="form-group">
							<input v-model='username'
										 type="text"
										 class="form-control"
										 placeholder="Enter your username"
										 required>
						</div>
						<div class="form-group">
							<input v-model='email'
										 type="email"
										 class="form-control"
										 placeholder="Enter your email"
										 required>
						</div>
						<div class="form-group">
							<input v-model='password'
										 type="password"
										 class="form-control"
										 placeholder="Enter your password"
										 required>
						</div>
						<div class="d-flex mt-4">
							<button type="submit" class="ml-auto btn btn-primary">Register</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import to from '../../utils/to';
import notify from '../../utils/notify';

export default {
	name: 'Register',
	data: () => ({
		username: null,
		password: null,
		email: null,
		error: false,
	}),
	methods: {
		async onSubmit() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.axios.post(`${this.$serverApiLink}/register`, {
				username: this.username,
				password: this.password,
				email: this.email,
			}));

			if (err) {
				return notify('Error !', 'User already exist', 'error');
			}

			notify('Success !', 'User created', 'success');

			return this.$router.push('/login');
		},
	},
};
</script>

<style scoped>

</style>
