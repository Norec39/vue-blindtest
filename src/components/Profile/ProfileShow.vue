<template>
	<div class="mt-3">
		Username : {{ user.username }}<br>
		Email : {{ user.email }}<br>
		Points : {{ user.points }}<br>
	</div>
</template>

<script>
import to from '../../utils/to';
import notify from '../../utils/notify';
import profile from '../../utils/profile';

export default {
	name: 'ProfileShow',
	data: () => ({
		user: false,
	}),
	// eslint-disable-next-line consistent-return
	async mounted() {
		const [err, response] = await to(this.axios.get(
			`${this.$serverApiLink}/users/${profile.id}`,
		));

		if (err) {
			return notify('Error !', 'Can\'t retrieve profile', 'error');
		}

		this.user = response.data;
	},
	methods: {
	},
};
</script>

<style scoped>

</style>
