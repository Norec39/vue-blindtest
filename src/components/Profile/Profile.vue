<template>
	<div class="container mt-5">
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<a class="nav-link active" data-toggle="tab" href="#profile">Profile</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#username">Change username/email</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#password">Change Password</a>
			</li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane fade active show" id="profile">
				<profile-show></profile-show>
			</div>
			<div class="tab-pane fade" id="username">
				<edit-username-email></edit-username-email>
			</div>
			<div class="tab-pane fade" id="password">
				<edit-password></edit-password>
			</div>
		</div>
	</div>
</template>

<script>
import ProfileShow from './ProfileShow.vue';
import EditUsernameEmail from './EditUsernameEmail.vue';
import EditPassword from './EditPassword.vue';

export default {
	name: 'Profile',
	components: { EditPassword, EditUsernameEmail, ProfileShow },
};
</script>

<style scoped>

</style>
