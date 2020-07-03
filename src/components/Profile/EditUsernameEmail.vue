<template>
	<div>
		<form class="mt-3" @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="emailInput">Email</label>
				<input v-model='email'
					   type="email"
					   class="form-control"
					   :placeholder="oldEmail"
					   id="emailInput">
			</div>
			<div class="form-group">
				<label for="usernameInput">Username</label>
				<input v-model='username'
					   type="text"
					   class="form-control"
					   :placeholder="oldUsername"
					   id="usernameInput">
			</div>
			<div class="form-group">
				<label for="passwordInput">Password</label>
				<input v-model='password'
					   type="password"
					   class="form-control"
					   placeholder="Enter your password"
					   id="passwordInput"
					   required>
			</div>
			<div class="d-flex mt-4">
				<button type="submit" class="ml-auto btn btn-primary" :disabled="!username && !email">
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
	name: 'EditUsernameEmail',
	data: () => ({
		oldUsername: profile.username,
		oldEmail: profile.email,
		username: null,
		email: null,
		password: null,
	}),
	mounted() {
	},
	methods: {
		async onSubmit() {
			const [err, response] = await to(this.axios.put(
				`${this.$serverApiLink}/users/${profile.id}`, {
					username: this.username === null ? this.oldUsername : this.username,
					email: this.email === null ? this.oldEmail : this.email,
				},
			));

			if (err) {
				return notify('Error !', 'Email already used', 'error');
			}

			this.user = response.data;

			await this.renewToken();
			await this.clearComponent();

			return notify('Error !', 'Username/email succesfully change', 'success');
		},
		async renewToken() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.axios.post(`${this.$serverApiLink}/login_check`, {
				username: this.email === null ? this.oldEmail : this.email,
				password: this.password,
			}));

			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user_profile', JSON.stringify(response.data.data));
		},
		clearComponent() {
			this.oldUsername = profile.username;
			this.oldEmail = profile.email;
			this.username = null;
			this.email = null;
			this.password = null;
		},
	},
};
</script>

<style scoped>

</style>
