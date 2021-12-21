# talk-api

## 完成デモ
まずはここでAPIKeyを発行してください（メールアドレスが必要です）
https://a3rt.recruit.co.jp/product/talkAPI/registered/

メールアドレスにAPIKeyが送られてきたら、下記のページでデモを試してみましょう。
https://a3rt.recruit.co.jp/product/demo/talkAPI_demo1/index.html

## 何をするか
インターネット上に公開されている様々なAPIを使用する方法を学ぶ
APIについては[こちら](Draft.md)で解説。

# 手順

実際にWeb APIを使ってみましょう。
TalkAPIもWebAPIの一つです。
デモで発行したAPIKeyを使用して、リクエストを送ってみましょう。

## [cURL](https://curl.se/)
まずは自分のパソコンのコンソールからリクエストを送る方法として、`cURL`というコマンドラインツールを使います。

Windowsではコマンドプロンプト、Macではターミナルを立ち上げ下記のコマンドを実行してください。
```
curl --version
```

エラーが出なければ、下記のコマンドを実行してみましょう。
AAA... の部分は、でもで発行したAPIKeyに置き換えてください。
```
curl -X POST https://api.a3rt.recruit.co.jp/talk/v1/smalltalk \
-F "apikey=" \
-F "query=おはよう"
```

下記のように表示されれば成功です 。
```
{
	status: 0,
	message: "ok",
	results: [{
		perplexity: 2.3688167429546714,
		reply: "おはようございます"
	}],
}
```
`perplexity` の数値は違っていても大丈夫です。

「おはよう」の部分を変更するとその内容にそった返答が返ってくるはずです。
「今日の天気は？」などでも返ってくるはず、変な返答なこともあります。。。


### console javascript
次はブラウザ上のコンソールからリクエストを送ってみます。

Google Chrome を立ち上げて、Googleなどのページを表示した状態でデベロッパーコンソールを開いてください。
デベロッパーツールは右上の三点リーダーから「その他のツール」→「デベロッパーツール」として開けます。

![googlechrome_developertools](https://user-images.githubusercontent.com/26959415/146707447-760f7fa0-2647-4b11-aeda-1018390ea963.png)

開けたらコンソールに入力できると思います。

ここはN予備校の[「JavaScript体験」](https://www.nnn.ed.nico/contents/guides/5181#how-to-open-console)を参考にしてください。


ここではJavaScriptが実行できるので、上記の 「cURL」で行ったことを実行してみましょう。
JavaScriptからリクエストを送る際は「fetch」という関数を使用します。

fetch: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch

下記のようにコンソールに入力して実行してみてください。
```js
const formdata = new FormData();
formdata.append('apikey','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query','おはよう');

const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',{
	method: 'post',
	body: formdata,
});

const json = await response.json();
console.log(json);
```

下記のような内容が返ってくれば成功です。
```
{status: 0, message: 'ok', results: Array(1)}

message: "ok"
results: Array(1)
	0: {perplexity: 0.07743213382788067, reply: 'おはようございます'}
	length: 1
status: 0
```


### JavaScriptファイルからの実行

次は自分で作成したWebページからJavaScriptの実行をしてみましょう。
(レポジトリ内のtestディレクトリ以下に同じファイルを置いています。)

下記のような `index.html` と `main.js` を作成します。

index.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    テストページ
    <div id="result"></div>
</body>
<script type="module" src="main.js"></script>
</html>
```

main.js
```js
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
```

index.html をGoogle Chromeで開いてみましょう。

テストページという表示だけが出て、他はなにも表示されていないと思います。
デベロッパーツールを確認してみてください、下記のようなエラーが出ていると思います

```
Access to script at 'file:///C:/Users/wingr/Documents/clack/talk-api/main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.
```
![googlechrome_errorfetch_onlocalfile](https://user-images.githubusercontent.com/26959415/146707483-80c10375-b9fe-4a83-941d-4b27eb223750.png)


これはCORS(Cross-Origin Resource Sharing) によるエラーが発生しています。

今回のエラーの内容を簡単に説明すると、ブラウザは特定のスキーマ(`http://`, `https://`など)以外で公開されているWebページからのリクエストを許可していません。
今回の場合は、自分のパソコン上のファイルを開いているだけなので上記の制限に引っ掛かりエラーが発生しています。(スキーマは`file://`。)

ブラウザのコンソールから実行することに関しては、そのコンソールを開いているページのURLを参照するのでエラーが発生しませんでした。空のページでもコンソールを使えますが、その場合はエラーが発生します。

また実際にWebページを公開したとしても、他のCORSの制限として同じ名前がついている場所へのリクエストしか許可しないというものがあります。
たとえば、 `https://example.com/` という場所で公開されている場合は、`https://example.com/abc` という場所へのリクエストはできますが、`https://example.co.jp/abc` 	という場所へのリクエストは行えません。

このようなCORSの制限はブラウザ上でのことなので、`cURL`のようなブラウザ以外のソフトウェアからリクエストを送る場合には当てはまりません。
そのため、CORSエラーを回避するために同じ場所にサーバーを用意し、ブラウザからはそのサーバーに対してリクエストを送り、サーバーが外部に対してリクエストを送るという順序がとられることが多いです。
今回は最後に下記の図のような形をとるようにします。

![test](https://user-images.githubusercontent.com/26959415/146918576-7870b056-6431-4aca-8b28-1aa4337190e1.png)


今回のようなエラーが発生している詳しい説明は[ここ](https://ja.javascript.info/fetch-crossorigin) が詳しいです。
CORSの考え方自体は[こちら](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS) を参考。


### Nodeから実行する

#### Nodeのインストール

今回のこのエラーを回避するために使用するサーバーとしてブラウザとほぼ同じようにJavaScriptが使用できる「Node」を使用します。

Nodeについての詳細は、N予備校サーバーサイドプログラミング入門の02節を確認してください
https://www.nnn.ed.nico/courses/999/chapters/13382
(Dockerの部分などの理解は現状では不要です)

まずは、Nodeのインストールを行います。
[Nodeのダウンロードページ](https://nodejs.org/download/release/v16.13.1/) からインストーラーをダウンロードして実行してください。
もしくは下記のリンクを使用。

- Windows: https://nodejs.org/download/release/v16.13.1/node-v16.13.1-x64.msi
- Mac: https://nodejs.org/download/release/v16.13.1/node-v16.13.1.pkg

インストールができたら、Windowsの場合はコマンドプロンプト、Macの場合はターミナルを起動して下記のコマンドを実行してください。
```
node -v
```

実行結果が下記のようになればインストール完了です。
```
v16.13.1
```

#### Nodeでの実行

Nodeのインストールが実行出来たら、Google Chromeで実行したものと同等のことを行ってみましょう

`index.js` という名前でファイルを作成して、下記の内容で保存します。
APIKeyの部分はデモで発行したものに書き換えてください。

index.js
```js
import fetch from "node-fetch";
import FormData from "form-data";

const formdata = new FormData();
formdata.append('apikey','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query','おはよう');

const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',{
	method: 'post',
	body: formdata,
});

const json = await response.json();
console.log(json);
```

次に `package.json` というファイルを下記の内容で作成します。
このファイルは index.js と同じディレクト内で作成してください。

package.json
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "main": "node index.js",
  },
  "type": "module",
  "dependencies": {
    "form-data": "^4.0.0",
    "node-fetch": "^3.1.0"
  }
}
```

作成したらpackage.jsonと同じディレクトリで下記のコマンドを実行してください
```
npm install
```

エラーなく完了したら、下記のコマンドを試してみましょう。
```
node index.js
```

警告などがでるかもしれませんが、下記のようにcURLを実行したときと同じような結果が得られるはずです。
```
{
  status: 0,
  message: 'ok',
  results: [ { perplexity: 0.07743213382788067, reply: 'おはようございます' } ]
}
```

### Nodeでサーバーを実行する

次はNodeでサーバーを実行して、Webページを配信できる状態を作ります。

まずは、package.jsonの修正を行います。

package.json
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "main": "node index.js"
  },
  "type": "module",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.2",
    "form-data": "^4.0.0",
    "node-fetch": "^3.1.0"
  }
}
```

作成したらpackage.jsonと同じディレクトリで下記のコマンドを実行してください
```
npm install
```

補足: サーバーとして「[express](https://expressjs.com/ja/)」というWebフレームワークを使用します。

ここからはindex.jsを作り替えていきます。
最初にサーバーの動作確認をします。
index.js を下記のように変更してください。

index.js
```js
import path from 'path';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import FormData from "form-data";

// 使用しないのでコメントアウト
// const formdata = new FormData();
// formdata.append('apikey','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
// formdata.append('query','おはよう');

// const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',{
// 	method: 'post',
// 	body: formdata,
// });

// const json = await response.json();
// console.log(json);

const app = express();

app.get("/api", (req, res, next) => {
    res.json("hello world");
});

const server = app.listen(3000, () => {
	const address = server.address();
    console.log(`http://localhost:${address.port} でサーバーを実行しています`);
});

```

変更出来たら下記のコマンドを実行してください
```
node index.js
```

下記のような表示になって、コンソールに入力などができない状態になっていればOKです。
```
http://localhost:3000 でサーバーを実行しています
```

この状態で、ブラウザーのアドレスバーに `http://localhost:3000/api` と入力してみましょう。
下記の画像のように出れば成功です。

(googlechrome_nodeserver_test の画像を入れる) 

 一度サーバーを終了させます。
 コンソールに移って、「Ctrl+C」を押してください。
再度コンソールに文字が入力できる状態になっていればOKです。


次に作成したWebページ(HTMLなど)を表示します。
まずは、index.js と同じディレクトリに public というディレクトリを作成してください。
そしてその中に index.html, main.js を作成してください。

下記のようなディレクトリの状態になっていればOKです。

(vscode_public_test の画像を入れる)

publicディレクトリ内のindex.htmlとmain.jsの内容は下記のようにしておいて下さい

index.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    テストページ
    <div id="result"></div>
</body>
<script type="module" src="main.js"></script>
</html>
```

main.js
```js
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
```

サーバーがこれらのファイルを配信できるように index.js を書き換えます。

index.js
```js
import path from 'path';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import FormData from "form-data";

// コメントアウトした分は削除してOK

const app = express();
app.use(express.static(path.resolve('public'))); //  追加した行

app.get("/api", (req, res, next) => {
    res.json("hello world");
});

const server = app.listen(3000, () => {
	const address = server.address();
    console.log(`http://localhost:${address.port} でサーバーを実行しています`);
});

```

変更出来たらまた下記のコマンドを実行してください
```
node index.js
```

この状態で次は、ブラウザーのアドレスバーに `http://localhost:3000` と入力してみましょう。
下記の画像のように出れば成功です。

(googlechrome_nodeserver_testhtml の画像を入れる) 


### 一連の流れを作る

もう一度エラーが発生したときに示した図を確認します

![test](https://user-images.githubusercontent.com/26959415/146918576-7870b056-6431-4aca-8b28-1aa4337190e1.png)

この図の流れに沿うように、NodeJSサーバーを作りましょう。


最後にブラウザからNodeサーバーにリクエストを送って、NodeサーバーがTalkAPIサーバーにリクエストし、TalkAPIサーバーからのレスポンスをNodeサーバーを受け取り、Nodeサーバーがさらにブラウザにレスポンスを返すところ一連の流れを作ります。



