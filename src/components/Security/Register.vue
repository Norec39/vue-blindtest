<template>
	<div class="container mt-5 pt-5 col-md-4 offset-md-4">
		<div class="card bg-dark text-white">
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
								   :class="password && password.length < 8 ? 'is-invalid' : null"
								   placeholder="Enter your password"
								   @input="verifyPassword()"
								   required>
							<div v-if="password.length < 8" class="invalid-feedback">
								<strong>Password is too short</strong>
							</div>
							<small id="emailHelp" class="form-text text-white">
								Password must contains at least 8 characters
							</small>
						</div>
						<div class="form-group">
							<input v-model='passwordVerification'
								   type="password"
								   class="form-control"
								   :class="!passwordCheck ? 'is-invalid' : null"
								   placeholder="Verify your password"
								   @input="verifyPassword()"
								   required>
							<div v-if="!passwordCheck" class="invalid-feedback">
								<strong>Password is not the same</strong>
							</div>
						</div>
						<div class="d-flex mt-4">
							<button type="submit" class="ml-auto btn"
									:class="passwordCheck && password.length > 8
									? 'btn-success'
									: 'btn-light'"
									:disabled="!passwordCheck || password.length < 8">
								Register
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

export default {
	name: 'Register',
	data: () => ({
		username: null,
		password: '',
		passwordVerification: '',
		passwordCheck: true,
		email: null,
		error: false,
	}),
	methods: {
		verifyPassword() {
			// eslint-disable-next-line no-unused-expressions
			this.passwordVerification === this.password
				? this.passwordCheck = true
				: this.passwordCheck = false;
		},
		async onSubmit() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.$http.post('register', {
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
