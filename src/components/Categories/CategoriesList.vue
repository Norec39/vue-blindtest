<template>
	<div class="container mt-3">
		<button class="btn btn-light" @click="fetchRooms">
			<i class="fas fa-sync-alt"></i>
		</button>
		<div class="d-flex flex-row justify-content-between">
			<form @submit.prevent="onSubmit" class="form-inline">
				<div class="form-group mr-3 my-3">
						<input v-model='categorie'
									 type="text"
									 class="form-control"
									 placeholder="Name of the new categorie"
						>
				</div>
				<button type="submit" class="btn btn-success">
					Add
				</button>
			</form>
			<form @submit.prevent="submitEditElement" class="form-inline">
				<div class="form-group mr-3 my-3">
					<label class="mr-1" v-if="editCategorieId">Categorie {{ editCategorieId }}</label>
						<input v-model='editCategorie'
									 type="text"
									 class="form-control"
									 placeholder="Name of the new categorie"
						>
				</div>
				<button type="submit" class="btn btn-warning">
					Edit
				</button>
			</form>
		</div>
		<table class="table">
			<thead>
			<tr>
				<th scope="col" colspan="1">Id</th>
				<th scope="col" colspan="1">Title</th>
				<th scope="col" colspan="2" class="text-right">Actions</th>
			</tr>
			</thead>
			<tbody v-if="categories.length">
			<tr v-for="c in categories" :key="c['@id']">
				<td>{{ c.id }}</td>
				<td>{{ c.name }}</td>
				<td class="text-right">
					<button class="btn btn-warning mr-2" @click="editElement(c)">
						<i class="fa fa-pen"></i>
					</button>
					<button class="btn btn-danger" @click="removeElement(c.id)">
						<i class="fa fa-trash"></i>
					</button>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import to from '../../utils/to';
import notify from '../../utils/notify';

export default {
	name: 'CategoriesList',
	data: () => ({
		categories: [],
		categorie: '',
		editCategorie: '',
		editCategorieId: '',
	}),
	async created() {
		await this.fetchRooms();
	},
	methods: {
		async fetchRooms() {
			const [err, response] = await to(this.axios.get(
				`${this.$serverApiLink}/categories/`,
			));

			if (err) {
				return notify('Error !', 'Can\'t find categories', 'error');
			}
			this.categories = response.data;
			return true;
		},
		async removeElement(id) {
			const [err, response] = await to(this.axios.delete(
				`${this.$serverApiLink}/categories/${id}`,
			));

			if (err) {
				return notify('Error !', 'Can\'t delete categorie', 'error');
			}

			if (response) {
				await this.fetchRooms();
			}

			return true;
		},
		async onSubmit() {
			const [err, response] = await to(this.axios.post(
				`${this.$serverApiLink}/categories`,
				{
					name: this.categorie,
				},
			));

			if (err) {
				return notify('Error !', 'Can\'t add categorie', 'error');
			}

			this.categorie = null;

			if (response) {
				await this.fetchRooms();
			}

			return true;
		},
		async editElement(c) {
			this.editCategorie = c.name;
			this.editCategorieId = c.id;
		},
		async submitEditElement() {
			const [err, response] = await to(this.axios.patch(
				`${this.$serverApiLink}/categories/${this.editCategorieId}`,
				{
					name: this.editCategorie,
				},
				{
					headers: {
						'Content-Type': 'application/merge-patch+json',
					},
				},
			));

			if (err) {
				return notify('Error !', 'Can\'t update categories', 'error');
			}

			this.editCategorie = null;
			this.editCategorieId = null;

			if (response) {
				await this.fetchRooms();
			}
			return err;
		},
	},
};
</script>
