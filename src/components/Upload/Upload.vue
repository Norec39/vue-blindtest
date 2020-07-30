<template>
	<div class="container mt-5">
		<div class="card">
			<div class="card-header">
				Upload music
			</div>
			<div class="card-body">
				<div class="card-text">
					<form
							id="uploadAudio"
							@submit.prevent="checkForm">
						<div v-if="errors.length">
							<b>Please correct the following error(s):</b>
							<ul>
								<li v-for="error in errors" :key="error">{{ error }}</li>
							</ul>
						</div>

						<div class="form-group">
							<label for="title">Title</label>
							<input
									id="title"
									v-model="title"
									type="text"
									name="title"
									class="form-control"
							>
						</div>

						<div class="form-group">
							<label for="category">Category</label>
							<input
									id="category"
									v-model="category"
									type="text"
									name="category"
									class="form-control"
							>
						</div>

						<div class="form-group">
							<label for="support">Support</label>
							<input
									id="support"
									v-model="support"
									type="text"
									name="support"
									class="form-control"
							>
						</div>

						<div class="form-group">
							<label>File</label>
							<input type="file"
										 id="file"
										 class="form-control-file"
										 accept=".mp3,audio/*"
										 ref="file"
										 v-on:change="handleFileUpload()"
							/>
						</div>

						<p>{{ this.file }}</p>
						<button type="submit" class="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import to from '../../utils/to';

export default {
	name: 'Upload',
	data: () => ({
		errors: [],
		title: null,
		support: null,
		category: null,
		file: null,
	}),
	methods: {
		async checkForm() {
			const formData = new FormData();
			formData.append('file', this.file);
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.axios.post(`${this.$serverApiLink}/media_objects`, {
				file: formData,
			}, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}));

			if (err) {
				console.log(err);
			}
		},
		handleFileUpload() {
			// eslint-disable-next-line prefer-destructuring
			this.file = this.$refs.file.files[0];
			console.log(this.file);
		},
	},
};
</script>

<style scoped>

</style>
