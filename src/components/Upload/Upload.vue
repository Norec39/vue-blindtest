<template>
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
						<label for="category">Category</label>
						<select class="form-control"
						        id="category"
						        v-model="category"
						        name="category"
						        @change="onCategoryChange($event)"
						>
							<option v-for="option in categories"
							        v-bind:value="option.id"
							        v-bind:key="option.id"
							>
								{{ option.name }}
							</option>
						</select>
					</div>

					<div class="form-group">
<!--						<label for="exampleFormControlSelect1">Example select</label>-->
<!--						<select class="form-control" id="exampleFormControlSelect1" :disabled="category == null">-->
<!--							<option>1</option>-->
<!--							<option>2</option>-->
<!--							<option>3</option>-->
<!--							<option>4</option>-->
<!--							<option>5</option>-->
<!--						</select>-->

						<label for="source">Origin</label>
						<input
								id="source"
								v-model="source"
								type="text"
								name="title"
								class="form-control"
						>
					</div>

					<div class="form-group">
						<label for="title">New Origin?</label>
						<input
							id="title"
							v-model="title"
							type="text"
							name="title"
							class="form-control"
						>
					</div>

					<div class="form-group">
						<label>File
						<input type="file"
						       id="file"
						       class="form-control-file"
						       accept=".mp3,audio/*"
						       ref="file"
						       v-on:change="handleFileUpload()"
						/>
						</label>
					</div>

					<p>{{ this.file }}</p>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
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
		categories: [],
		category: null,
		sources: [],
		source: null,
		file: null,
	}),
	beforeMount() {
		this.getCategories();
	},
	methods: {
		async getCategories() {
			const [err, response] = await to(this.axios.get(`${this.$serverApiLink}/categories`));
			if (err) {
				console.error(err);
			}
			this.categories = response.data;
		},
		async checkForm() {
			const formData = new FormData();
			formData.append('file', this.file);
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.axios.post(`${this.$serverApiLink}/media_objects`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}));

			if (err) {
				console.error(err);
			}
		},
		onCategoryChange(event) {
			this.sources = this.categories.find((category) => category.id === event.target.value).sources;
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
