const formdata = new FormData();
formdata.append('apikey','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query','おはよう');

const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',{
	method: 'post',
	body: formdata,
});

const json = await response.json();
console.log(json);

const result = document.getElementById("result");
result.innerHTML = `${json.results[0].reply}`;