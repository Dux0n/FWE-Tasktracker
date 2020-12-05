import * as bodyParser from 'body-parser';
import express from 'express';
import { StartBot } from './src/discord-bot/discordbot';
import { globalRouter } from './src/router/global.router';
import { createDBcon } from './src/util/createDBcon';

export const StartServer = async () => {
	try {
		const app = express();
		const port = 4000;
		const dbConnection = await createDBcon();
		app.use(bodyParser.json());

		app.use('/api', globalRouter);

		app.listen(port, () => {
			console.log(`[Express]: Listening at http://localhost:${port}`);
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
};

void StartServer();
void StartBot();
