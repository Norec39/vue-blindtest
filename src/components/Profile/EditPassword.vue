<template>
	<div>
		<form class="mt-3" @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="oldPasswordInput">Old Password</label>
				<input v-model='oldPassword'
					   type="password"
					   class="form-control"
					   placeholder="Enter your old password"
					   id="oldPasswordInput">
			</div>
			<div class="form-group">

				<label for="newPasswordInput">New Password</label>
				<input v-model='password'
					   type="password"
					   class="form-control"
					   :class="password && password.length < 8 ? 'is-invalid' : null"
					   placeholder="Enter your password"
					   @input="verifyPassword()"
					   id="newPasswordInput"
					   required>
				<div v-if="password.length < 8" class="invalid-feedback">
					<strong>Password is too short</strong>
				</div>
				<small id="emailHelp" class="form-text text-dark">
					Password must contains at least 8 characters
				</small>
			</div>
			<div class="form-group">
				<label for="newPasswordVerificationInput">Confirm New Password</label>
				<input v-model='passwordVerification'
					   type="password"
					   class="form-control"
					   :class="!passwordCheck ? 'is-invalid' : null"
					   placeholder="Verify your password"
					   @input="verifyPassword()"
					   id="newPasswordVerificationInput"
					   required>
				<div v-if="!passwordCheck" class="invalid-feedback">
					<strong>Password is not the same</strong>
				</div>
			</div>
			<div class="d-flex mt-4">
				<button v-if="!passwordCheck || password.length < 8"
						type="submit" class="ml-auto btn btn-light"
						:disabled="!passwordCheck || password.length < 8">
					Submit
				</button>
				<button type="submit" class="ml-auto btn btn-success" v-else>
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import to from '../../utils/to';
import notify from '../../utils/notify';
import profile from '../../utils/profile';

export default {
	name: 'EditPassword',
	data: () => ({
		email: null,
		oldPassword: '',
		password: '',
		passwordVerification: '',
		passwordCheck: true,
	}),
	mounted() {
		this.email = profile.email;
	},
	methods: {
		async onSubmit() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.$http.post(
				'/users/password-change', {
					password: this.password,
					old_password: this.oldPassword,
				},
			));

			if (err) {
				return notify('Error !', err.response.data.message, 'error');
			}

			await this.renewToken();
			await this.clearComponent();

			return notify('Success !', 'Username/email succesfully change', 'success');
		},
		async renewToken() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.$http.post('/login_check', {
				username: this.email,
				password: this.password,
			}));

			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user_profile', JSON.stringify(response.data.data));
		},
		verifyPassword() {
			// eslint-disable-next-line no-unused-expressions
			this.passwordVerification === this.password
				? this.passwordCheck = true
				: this.passwordCheck = false;
		},
		clearComponent() {
			this.email = null;
			this.oldPassword = '';
			this.password = '';
			this.passwordVerification = '';
			this.passwordCheck = true;
		},
	},
};
</script>

<style scoped>

</style>
