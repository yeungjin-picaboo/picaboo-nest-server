import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataSource } from 'typeorm';

@Injectable()
export class EmotionService {
	constructor(private dataSource: DataSource) {}
	async sentimentTxt(diary: JSON) {
		const client_id = process.env.CLOVA_CLIENT_ID;
		const client_secret = process.env.CLOVA_SECRET;
		const url = process.env.CLOVA_URL;

		const headers = {
			'X-NCP-APIGW-API-KEY-ID': client_id,
			'X-NCP-APIGW-API-KEY': client_secret,
			'Content-Type': 'application/json',
		};

		const content = { content: diary['diary'] };

		console.log(client_id);
		console.log(client_secret);
		try {
			let test = await axios.post(url, content, { headers });
			console.log(test.data);
			return test.data.document.sentiment; // 기분을 리턴해준다
			// return 'positive';
		} catch (error) {
			console.log(error);
		}
	}
}
