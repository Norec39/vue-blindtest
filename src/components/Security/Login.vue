<template>
	<div class="container mt-5 pt-5 col-md-4 offset-md-4">
		<div class="card bg-secondary text-white">
			<div class="card-header">
				Login
			</div>
			<div class="card-body">
				<div class="card-text">
					<form @submit.prevent="onSubmit">
						<div class="form-group">
							<input v-model='email'
								   type="text"
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
							<router-link class="btn btn-light"
										 :to="{ name: 'register'}"
										 type="submit">Register
							</router-link>
							<button type="submit" class="ml-auto btn btn-primary">
								Login
							</button>
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
import eventBus from '../../utils/eventBus';

export default {
	name: 'Login',
	data: () => ({
		email: null,
		password: null,
		error: false,
	}),
	methods: {
		async onSubmit() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.$http.post('/login_check', {
				username: this.email,
				password: this.password,
			}));

			if (err) {
				return notify('Error !', 'Bad credentials', 'error');
			}
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', 'true');
			localStorage.setItem('user_profile', JSON.stringify(response.data.data));

			eventBus.$emit('login');

			window.location.href = '/';

			return true;
		},
	},
};
</script>

<style scoped>

</style>
