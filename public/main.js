const formdata = new FormData();
formdata.append('apikey', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query', 'おはよう');

const response = await fetch(window.location + "talk", {
	method: 'post',
	body: formdata,
});

const json = await response.json();
console.log(json);

const result = document.getElementById("result");
result.innerHTML = `${json.results[0].reply}`;