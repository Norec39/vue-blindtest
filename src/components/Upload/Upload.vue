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
						<i class="fas fa-spinner fa-spin"></i>
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
								<option :value="null" selected>(Choose a game from the list...)</option>
								<option v-for="source in sources"
								        v-bind:value="source"
								        v-bind:key="source.id"
								>
									{{ source.name }}
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

						<div class="form-group"
						     v-if="file"
						>
							<label for="startTime">Start Time</label>
							<input
									id="startTime"
									v-model="startTime"
									type="number"
									name="startTime"
									class="form-control"
									min="0"
									value="0"
							>
						</div>

						<div class="form-group"
						     v-if="file"
						>
							<label for="audioLength">Length</label>
							<input
									id="audioLength"
									v-model="audioLength"
									type="number"
									name="audioLength"
									class="form-control"
									min="15"
									value="30"
							>
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
import notify from '../../utils/notify';
import eventBus from '../../utils/eventBus';

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
		startTime: 0,
		audioLength: 30,
	}),
	beforeMount() {
		this.getCategories();
	},
	methods: {
		async getCategories() {
			const [err, response] = await to(this.$http.get('/categories'));
			if (err) {
				console.error(err);
				return notify('Error !', 'Can\'t retrieve categories', 'error');
			}

			this.categories = response.data;
			return true;
		},
		async checkForm() {
			const formData = new FormData();
			formData.set('startTime', this.startTime);
			formData.set('audioLength', this.audioLength);
			formData.append('file', this.file);
			// eslint-disable-next-line no-unused-vars
			let [err, response] = await to(this.$http.post('media_objects', formData, {
				headers: {
					Accept: 'application/ld+json',
					'Content-Type': 'multipart/form-data',
				},
			}));

			if (err) {
				console.error(err);
				return notify('Error !', 'There was a problem uploading the audio file.', 'error');
			}
			const mediaSrcId = response.data['@id'];

			// Create new Source
			if (this.source == null) {
				[err, response] = await to(this.$http.post('sources', {
					name: this.newSource,
					category: `/api/categories/${this.category.id}`,
				}));

				if (err) {
					console.error(err);
					return notify(
						'Error !',
						`There was a problem creating the new ${this.getSourceType()}`,
						'error',
					);
				}
				this.source = response.data;
			}

			// eslint-disable-next-line no-unused-vars
			[err, response] = await to(this.$http.post('songs', {
				title: this.title,
				source: `/api/sources/${this.source.id}`,
				src: mediaSrcId,
			}));

			if (err) {
				console.error(err);
				return notify(
					'Error !',
					'There was a problem uploading the audio file.',
					'error',
				);
			}

			eventBus.$emit('successfulUpdate');
			return this.$router.push('/');
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
		},
	},
};
</script>

<style scoped>

</style>
