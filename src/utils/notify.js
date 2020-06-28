import Vue from 'vue';

export default function notify(title, text, icon) {
	return Vue.swal({
		title,
		text,
		toast: true,
		position: 'top-end',
		icon,
		timerProgressBar: true,
		timer: 2000,
	});
}
