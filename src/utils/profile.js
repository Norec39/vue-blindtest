export default {
	username: JSON.parse(localStorage.getItem('user_profile'))?.username,
	email: JSON.parse(localStorage.getItem('user_profile'))?.email,
	role: JSON.parse(localStorage.getItem('user_profile'))?.role,
	id: JSON.parse(localStorage.getItem('user_profile'))?.id,
	points: JSON.parse(localStorage.getItem('user_profile'))?.points,
};
