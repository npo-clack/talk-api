import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.static('.'));

app.get("/api", function(req, res, next){
    res.json("hello world");
});

app.post("/talk", async (req, res, next) => {
    const requestUrl = "https://api.a3rt.recruit.co.jp/talk/v1/smalltalk";
    const apiToken = "DZZlK4na6kWXu9MgW44pqf9NeMIFCNjD";
    try {
        const params = new URLSearchParams();
        params.append('apikey', apiToken);
        params.append('query', "おはよう");
        const response = await fetch(requestUrl, {
            method: 'POST',
            mode: 'cors',
            body: params
        });
        const json = await response.json();
        res.json(json);
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});
