import fetch from "node-fetch";
import FormData from "form-data";

const formdata = new FormData();
formdata.append('apikey','DZZlK4na6kWXu9MgW44pqf9NeMIFCNjD');
formdata.append('query','おはよう');

const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',{
	method: 'post',
	body: formdata,
});

const json = await response.json();
console.log(json);
