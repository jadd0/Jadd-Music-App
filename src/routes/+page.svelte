<script lang="ts">
	let songName = '';
	let isName: number = 0;
	let songs: {}[] = [];

	async function submit(e: any) {
		if (songName.length < 1) {
			isName = 0;
			return;
		}
		const res = await fetch(`/api/getSpotify?query=${songName}`, {
			headers: { 'Content-Type': 'application/json' }
		});
		const parse = await res.json()
		if (parse[0] == null) {
			songs = []
			return
		}
		songs = parse
		console.log(songs);
	}
</script>

<svelte:window on:keyup={submit} />

<body>
	<div class="container">
		<h1>Name Finder</h1>
		<div class="inputHolder">
			<input class="userInput" type="text" bind:value={songName} />
			<span class="floatingLabel">Name</span>
		</div>

		<div class="songContainer">
			{#each songs as song}
				<div class="song">
					<img src={song.album.images[0].url} class="thumbnail" />
					<div class="properties">
						<h2>{song.name}</h2>
						<div class="explicitAndArtist">
							{#if song.explicit}
								<div class="explicitHolder">
									<div class="explicit">
									<span class="explicitText">E</span>
								</div>
								</div>
								
							{/if}
							<h3>{song.artists[0].name}</h3>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</body>

<style>
	@font-face {
		font-family: 'Circular';
		src: url('/CircularStd-Book.otf');
	}
	body {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		/* height: 1000vh; */
		width: 100vw;
		height: 100vh;
		background-color: #141414;
		/* overflow: hidden; */
	}

	* {
		font-size: 24px;
		text-align: center;
		color: white;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-family: Circular;
		font-weight: 300;
	}

	.inputHolder {
		width: 300px;
		height: 50px;
		padding-bottom: 5px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 5px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: all 0.2s linear;
	}
	.userInput {
		width: 92.5%;
		font-size: 20px !important;
		min-height: 35px;
		margin-left: 10px;
		margin-top: 5px;
		background: #212121;
		color: white;
		text-align: left;
	}
	.inputHolder .userInput:focus {
		border-color: blue;
		border-width: medium medium 2px;
	}
	.inputHolder .floatingLabel {
		position: relative;
		pointer-events: none;
		top: -40px;
		left: 10px;
		transition: 0.2s ease all;
		font-size: 15px;
		color: #727272;
	}
	.inputHolder input:focus ~ .floatingLabel,
	.inputHolder input:not(:focus):valid ~ .floatingLabel {
		top: -57px;
		left: 10px;
		font-size: 10px;
		opacity: 1;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
	}

	input {
		font-size: 17px !important;
	}

	.songContainer {
		width: 600px;
		height: 500px;
		overflow: scroll;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 0 auto;
		border-radius: 15px;
		margin-top: 50px;
	}

	.song {
		width: 100%;
		min-height: 100px;
		background: #181818;
		display: flex;
		border-radius: 6px;
	}

	.song:nth-child(1) {
		margin-top: 1700px;
	}

	.thumbnail {
		width: 60px;
		height: 60px;
		/* float: left;
		margin-left: 20px;
		margin: 0 auto; */
		position: relative;
		top: 20%;
		left: 5%;
	}

	.properties {
		width: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		margin-left: 7%;
	}

	h2 {
		font-size: 17px;
		text-align: left;
		margin-top: 25px;
	}

	h3 {
		font-size: 13px;
		text-align: left;
		float: left;
	}

	.explicit {
		width: 14px;
		height: 14px;
		background: #a5a3a2;
		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 0px;
	}

	.explicitHolder {
		padding-right: 5px
	}

	.explicitText {
		font-size: 8px;
		color: #121212;
		text-align: center;
		margin-top: 1px;
	}

	.explicitAndArtist {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		margin-top: 5px;
	}

	@media (max-width: 460px) {
		#loginForm {
			width: 325px !important;
		}
	}

	.shake {
		animation: shake2 0.2s linear;
	}

	.wrong {
		border: 2px solid red;
	}

	@keyframes shake2 {
		25% {
			transform: translateX(11px);
		}

		50% {
			transform: translateX(0px);
		}

		75% {
			transform: translateX(-11px);
		}
	}

	p {
		margin-top: -15px;
		padding: 0px 20px 5px 20px;
		color: rgb(142, 142, 142);
		font-size: 14px;
		font-weight: 400;
		transition: all 0.2s linear;
	}

	#userInput {
		/* width: 264px; */
		width: 87.5%;
		height: 34px !important;
		margin-left: 19px;
		margin-top: 2px;
		background: #212121 !important;
		color: white;
		text-align: left;
	}

	#inputHolder {
		width: 75%;
		height: 40px;
		margin: 0 auto;
		margin-top: 10px;
		background: #212121;
		border-radius: 20px;
		color: white;
		text-align: left;
	}

	h1 {
		font-size: 40px;
		font-weight: 700;
		padding-top: 20px;
		padding-bottom: 20px;
		color: white;
	}

	#loginForm {
		margin: 0 auto;
		background: #1b1b1b;
		width: 400px;
		height: 375px;
		border-radius: 15px;
		margin-top: 7vh;
	}

	/* input {
		margin: 0 auto;
		line-height: 16px;
	} */

	a {
		text-decoration: none;
	}

	#loginButton {
		margin: 0 auto;
		margin-top: 30px;
		width: 78%;
		height: 50px;
		color: white;
		font-weight: 600;
		background-color: #212121;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.2s linear;
	}

	#loginButton:hover {
		background: rgb(56, 56, 56);
	}
</style>
