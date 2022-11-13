import { redirect } from "@sveltejs/kit";

export class Spotify {
	refreshToken: string;
	accessToken: string;
	clientId: string;
	clientSecret: string;

	constructor(refreshToken: string, clientId: string, clientSecret: string) {
		this.refreshToken = refreshToken;
		this.accessToken = '';
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	async getAccess() {
    console.log({1: this.clientId, 2: this.clientSecret, 3: this.refreshToken});
		const clientEncoded = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    console.log(clientEncoded)
		const url = `https://accounts.spotify.com/api/token`;

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${clientEncoded}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: this.refreshToken
			})
		});
		const parsed = await res.json();
		this.accessToken = parsed['access_token'];
	}

	async search(config: {
		query: string;
		type: string;
		market: string;
		limit: number;
		offset: number;
	}) {
		const { query, type, market, limit, offset } = config;

    if (this.accessToken == undefined || this.accessToken.length == 0) {
			await this.getAccess();
		}

		const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.accessToken}`
			}
		});
    
    if (!res.ok) {
      return false
    }

    return await res.json()
	}
}
