import path from 'path';
import express from 'express';
import fetch from 'node-fetch';
import expressFormData from 'express-form-data';
import FormData from 'form-data';

const app = express();
app.use(express.static(path.resolve('public')));
app.use(expressFormData.parse()); // この行を追加

app.get("/api", (req, res, next) => {
	res.json("hello world");
});

// この節を追加
app.post("/talk", async (req, res, next) => {
	const formdata = new FormData();
	formdata.append('apikey', req.body.apikey);
	formdata.append('query', req.body.query);

	const response = await fetch("https://api.a3rt.recruit.co.jp/talk/v1/smalltalk", {
		method: 'post',
		body: formdata,
	});

	const json = await response.json();
	console.log(json);
	res.json(json);
});

const server = app.listen(3000, () => {
	const address = server.address();
	console.log(`http://localhost:${address.port} でサーバーを実行しています`);
});