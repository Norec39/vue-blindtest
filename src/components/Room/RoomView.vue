<template>
	<div class="container mt-3">
		<h1 class="d-flex justify-content-center">Room : {{ room.name }}</h1>
		<div class="d-flex justify-content-center mt-5" v-if="!gameStarted">
			<div v-if="!songList" class="text-center">
				<i class="fas fa-spin fa-3x fa-sync fa-fw text-primary"></i>
				<p class="mt-3 lead">Loading</p>
			</div>
			<button class="btn btn-primary btn-lg" @click="startGame" v-else>Start Game</button>
		</div>
		<!-- Main Gameplay div-->
		<div v-else>
			<h3>Current score : <span class="badge badge-success">{{ score }}</span></h3>
			<h3>Songs played : <span class="badge badge-dark">{{ songsPlayed }}</span></h3>
			<div class="d-flex justify-content-center">
				<audio controls loop v-if="audioSrc" id="audioPlayer">
					<source :src="audioSrc" type="audio/mpeg">
				</audio>
			</div>
			<div v-if="!haveAnswered && canPlayAudio">
				<h5 class="d-flex justify-content-center mt-2">Pick an answer :</h5>
				<div class="d-flex flex-row justify-content-around flex-wrap">
					<div v-for="source in sourceList"
							 v-bind:key="source.id"
					>
						<button class="btn btn-primary mt-2 mx-2"
								@click="checkAnswer(source.id)">{{ source.name }}</button>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="text-center" v-if="!haveAnswered">
					<i class="fas fa-spin fa-3x fa-sync fa-fw text-primary"></i>
					<p class="mt-3 lead">Loading audio</p>
				</div>
			</div>
			<!-- Result screen -->
			<div class="d-flex justify-content-center flex-column mt-5" v-if="haveAnswered">
				<div v-if="rightAnswer">
					<h4>Congratulations, you found the right answer in
					<span class="badge badge-dark">{{ timer / 100 }} seconds</span>!</h4>
				</div>
				<div v-else>
					Owwww... this was the wrong answer... and you put
					<span class="badge badge-dark">{{ timer / 100 }} seconds</span>
					seconds to not find it!
				</div>
				<h4>The answer was :</h4>
				<h3>{{ sources.find(source => source.id === getIriID(song.source)).name }} - {{ song.title }}</h3>
				<div v-if="score < room.scoreLimit">
					<button class="btn btn-primary" @click="newRound()">Next song!</button>
				</div>
				<div v-else>
					<h3>Game Over. Congratulations, you've reached the score limit.</h3>
					<button class="btn btn-success" @click="endGame">Close room</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import to from '../../utils/to';
import notify from '../../utils/notify';

export default {
	name: 'RoomList',
	data: () => ({
		room: { name: null },
		gameStarted: false,
		score: 0,
		songsPlayed: 0,
		sources: null,
		sourceList: [],
		songList: null,
		song: null,
		audioSrc: null,
		canPlayAudio: false,
		rightAnswer: true,
		haveAnswered: false,
		audioPlayer: null,
		timer: 0,
		timerInterval: null,
	}),
	async created() {
		await this.getRoomInfo();
		await this.fetchSources();
		await this.fetchSongs();
	},
	methods: {
		async getRoomInfo() {
			console.log('fetch');
			const [err, response] = await to(this.$http.get(`/games/${this.$route.params.id}`));

			if (err) {
				return notify('Error !', 'Can\'t find room', 'error');
			}
			this.room = response.data;
			return true;
		},
		async fetchSources() {
			const [err, response] = await to(this.$http.get('/sources'));

			if (err) {
				return notify('Error !', 'Can\'t find anz sources', 'error');
			}
			this.sources = response.data;
			this.sources = this.sources.sort((a, b) => a.name > b.name);
			return true;
		},
		async fetchSongs() {
			const [err, response] = await to(this.$http.get('/songs'));

			if (err) {
				return notify('Error !', 'Can\'t find anz sources', 'error');
			}
			this.songList = response.data;
			return true;
		},
		async startGame() {
			this.gameStarted = true;
			await this.getNewSong();
			this.audioPlayer = document.getElementById('audioPlayer');
			this.audioPlayer.volume = 0.2;
			this.audioPlayer.oncanplay = this.onCanPlayFunction();
			return true;
		},
		checkAnswer(id) {
			this.haveAnswered = true;
			this.timerStop();
			if (id === this.getIriID(this.song.source)) {
				this.score += 1;
				this.rightAnswer = true;
				return notify('Correct', 'Good Job.', 'success');
			}
			this.rightAnswer = false;
			return notify('Wrong', 'It was the wrong answer.', 'error');
		},
		getIriID(str) {
			const n = str.lastIndexOf('/');
			// eslint-disable-next-line radix
			return parseInt(str.substring(n + 1));
		},
		async getNewSong() {
			// Get Random song
			this.song = this.songList[Math.floor(Math.random() * this.songList.length)];
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.$http.get(`/media_objects/${this.getIriID(this.song.src)}`));

			if (err) {
				return notify('Error !', 'Can\'t find any music', 'error');
			}
			this.audioSrc = `http://localhost:8000${response.data.contentUrl}`;
			this.setSourceList();
			return true;
		},
		setSourceList() {
			this.sourceList = [];
			let idList = []; // eslint-disable-line
			let rng = 0;
			let i = 1;
			const songSource = this.sources.find((source) => source.id === this.getIriID(this.song.source));
			idList.push(songSource.id);
			this.sourceList.push(songSource);
			if (this.room.answerNb >= this.sources.length) {
				this.sourceList = this.sources;
				this.sourceList.sort((a, b) => a.name.localeCompare(b.name));
				return true;
			}
			while (i < this.room.answerNb) {
				rng = Math.floor(Math.random() * this.sources.length);
				if (!idList.includes(this.sources[rng].id)) {
					this.sourceList.push(this.sources[rng]);
					idList.push(this.sources[rng].id);
					i += 1;
				}
			}
			this.sourceList.sort((a, b) => a.name.localeCompare(b.name));
			return true;
		},
		timerStart() {
			this.timerInterval = setInterval(() => {
				this.timer += 1;
			}, 10);
		},
		timerStop() {
			clearInterval(this.timerInterval);
		},
		onCanPlayFunction() {
			this.canPlayAudio = true;
			this.audioPlayer.play();
			this.timerStart();
			this.songsPlayed += 1;
		},
		async newRound() {
			this.canPlayAudio = false;
			this.haveAnswered = false;
			this.audioPlayer.pause();
			await this.getNewSong();
			this.audioPlayer.load();
			this.audioPlayer.currentTime = 0;
			this.timer = 0;
			this.audioPlayer.oncanplaythrough = this.onCanPlayFunction();
		},
		async endGame() {
			// eslint-disable-next-line no-unused-vars
			const [err, response] = await to(this.$http.patch(
				`/games/${this.room.id}`,
				{
					active: false,
				},
				{
					headers: {
						'Content-Type': 'application/merge-patch+json',
					},
				},
			));
			if (err) {
				return notify('Error !', 'Can\'t close room', 'error');
			}
			return this.$router.push('/');
		},
	},
	destroyed() {
		delete this.audioPlayer;
	},
};
</script>
