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

					<div v-if="!categories">
						Loading...
					</div>
					<div class="form-group">
						<label for="category">Category</label>
						<select class="form-control"
						        id="category"
						        v-model="category"
						        name="category"
						        @change="onCategoryChange()"
						        :disabled="!categories"
						>
							<option v-for="category in categories"
							        v-bind:value="category"
							        v-bind:key="category.id"
							>
								{{ category.name }}
							</option>
						</select>
					</div>

					<div v-if="category !== null">
						<div class="form-group" v-if="sources.length !== 0">
							<label for="source">{{ getSourceType() }}</label>
							<select class="form-control"
							        id="source"
							        v-model="source"
							        type="text"
							        name="title"
							        :disabled="category == null">
								<option v-for="option in sources"
								        v-bind:value="option"
								        v-bind:key="option.id"
								>
									{{ option.name }}
								</option>
							</select>
						</div>

						<div class="form-group"
						     v-if="!source"
						>
							<label for="newSource">New {{ getSourceType() }}?</label>
							<input
								id="newSource"
								v-model="newSource"
								type="text"
								name="newSource"
								class="form-control"
							>
						</div>

						<div class="form-group">
							<label for="title">Track Title</label>
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

						<button type="submit" class="btn btn-primary">Submit</button>

					</div>
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
		categories: null,
		category: null,
		sources: [],
		source: null,
		newSource: null,
		title: null,
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
			this.categories = response.data['hydra:member'];
		},
		async checkForm() {
			const formData = new FormData();
			formData.append('file', this.file);
			// eslint-disable-next-line no-unused-vars
			let [err, response] = await to(this.axios.post(`${this.$serverApiLink}/media_objects`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}));

			if (err) {
				console.log('Error file upload');
				console.error(err);
				return false;
			}
			const mediaSrc = response.data.contentUrl;

			// Create new Source
			if (this.source == null) {
				[err, response] = await to(this.axios.post(`${this.$serverApiLink}/sources`, {
					name: this.newSource,
					Category: this.category,
				}));

				if (err) {
					console.error(err);
					return false;
				}
				this.source = response.data;
			}

			// eslint-disable-next-line no-unused-vars
			[err, response] = await to(this.axios.post(`${this.$serverApiLink}/songs`, {
				title: this.title,
				source: this.source,
				src: mediaSrc,
			}));

			if (err) {
				console.error(err);
				return false;
			}
			console.log('Envoi reussi');
			return true;
		},
		onCategoryChange() {
			this.sources = this.category.sources;
		},
		getSourceType() {
			let string = '';
			switch (this.category.id) {
			case 1:
				string = 'Game';
				break;
			case 2:
				string = 'Anime';
				break;
			case 3:
				string = 'Serie';
				break;
			default:
				string = '';
			}
			return string;
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
