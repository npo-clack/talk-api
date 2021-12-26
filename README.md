# talk-api

## 目次

- [デモ](#デモ)
- [何をするか](#何をするか)
- [手順](#手順)
- [コマンドラインツールからの実行(curl)](#コマンドラインツールからの実行curl)
- [GoogleChromeのデベロッパーツールからの実行](#googlechromeのデベロッパーツールからの実行)
- [JavaScriptファイルからの実行](#javascriptファイルからの実行)
- [Nodeからの実行](#nodeからの実行)
  - [Nodeのインストール](#nodeのインストール)
  - [package.jsonの作成とnodeコマンドの実行](#packagejsonの作成とnodeコマンドの実行)
- [Nodeでサーバーの実行](#nodeでサーバーの実行)
- [一連の流れを作る](#一連の流れを作る)
- [追加課題](#追加課題)

## デモ
まずは[ここ](https://a3rt.recruit.co.jp/product/talkAPI/registered/)でAPIKeyを発行してください（メールアドレスが必要です）

メールアドレスにAPIKeyが送られてきたら、[このページ](https://a3rt.recruit.co.jp/product/demo/talkAPI_demo1/index.html)でデモを試してみましょう。

## 何をするか
インターネット上に公開されている様々なAPIを使用する方法を学びます。

APIについては[こちら](additional/memo.md)で解説。

## 手順

実際にAPIを使ってみましょう。

TalkAPIもAPIの一つです。

デモで発行したAPIKeyを使用して、リクエストを送ってみましょう。

## コマンドラインツールからの実行(curl)

まずは自分のパソコンのコンソールからリクエストを送る方法として、[curl](https://curl.se/) というコマンドラインツールを使います。

Windowsではコマンドプロンプト、Macではターミナルを立ち上げ下記のコマンドを実行してください。
```
curl --version
```

エラーが出なければ、下記のコマンドを実行してみましょう。 `AAA...` の部分は、デモで発行したAPIKeyに置き換えてください。
```
curl -X POST https://api.a3rt.recruit.co.jp/talk/v1/smalltalk \
-F "apikey=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" \
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


## GoogleChromeのデベロッパーツールからの実行

次はブラウザ上のコンソールからリクエストを送ってみます。

GoogleChrome を立ち上げて、Googleなどのページを表示した状態でデベロッパーコンソールを開いてください。
デベロッパーツールは右上の三点リーダーから「その他のツール」→「デベロッパーツール」として開けます。

![googlechrome_developertools](https://user-images.githubusercontent.com/26959415/146707447-760f7fa0-2647-4b11-aeda-1018390ea963.png)

開けたらコンソールに入力できると思います。

ここはN予備校の[「JavaScript体験」](https://www.nnn.ed.nico/contents/guides/5181#how-to-open-console)を参考にしてください。


ここではJavaScriptが実行できるので、上記の 「curl」で行ったことを実行してみましょう。
JavaScriptからリクエストを送る際は「fetch」という関数を使用します。

fetch: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch

下記のようにコンソールに入力して実行してみてください。
```js
const formdata = new FormData();
formdata.append('apikey', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query', 'おはよう');

const response = await fetch("https://api.a3rt.recruit.co.jp/talk/v1/smalltalk", {
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


## JavaScriptファイルからの実行

次は自分で作成したWebページからJavaScriptの実行をしてみましょう。

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
formdata.append('apikey', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query', 'おはよう');

const response = await fetch("https://api.a3rt.recruit.co.jp/talk/v1/smalltalk", {
	method: 'post',
	body: formdata,
});

const json = await response.json();
console.log(json);

const result = document.getElementById("result");
result.innerHTML = `${json.results[0].reply}`;
```

`index.html` をGoogle Chromeで開いてみましょう。

テストページという表示だけが出て、他はなにも表示されていないと思います。
デベロッパーツールを確認してみてください、下記のようなエラーが出ていると思います

```
Access to script at 'file:///C:/Users/{username}/Documents/clack/talk-api/main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.
```
![googlechrome_errorfetch_onlocalfile](https://user-images.githubusercontent.com/26959415/146707483-80c10375-b9fe-4a83-941d-4b27eb223750.png)


これはCORS(Cross-Origin Resource Sharing) によるエラーが発生しています。

今回のエラーの内容をざっくりですが説明すると、ブラウザは特定のスキーマ(`http://`, `https://`など)以外で公開されているWebページからのリクエストを許可していません。
今回の場合は、自分のパソコン上のファイルを開いているだけなので上記の制限に引っ掛かりエラーが発生しています。(スキーマは`file://`。)

ブラウザのコンソールから実行することに関しては、そのコンソールを開いているページのURLを参照するのでエラーが発生しませんでした。空のページでもコンソールを使えますが、その場合はエラーが発生します。

また実際にWebページを公開したとしても、他のCORSの制限として同じ名前がついている場所へのリクエストしか許可しないというものがあります。
たとえば、 `https://example.com/` という場所で公開されている場合は、`https://example.com/abc` という場所へのリクエストはできますが、`https://example.co.jp/abc` 	という場所へのリクエストは行えません。

このようなCORSの制限はブラウザ上でのことなので、`curl`のようなブラウザ以外のソフトウェアからリクエストを送る場合には当てはまりません。
そのため、CORSエラーを回避するために同じ場所にサーバーを用意し、ブラウザからはそのサーバーに対してリクエストを送り、サーバーが外部に対してリクエストを送るという順序がとられることが多いです。
今回は最後に下記の図のような形をとるようにします。

![test](https://user-images.githubusercontent.com/26959415/146918576-7870b056-6431-4aca-8b28-1aa4337190e1.png)


今回のようなエラーが発生している詳しい説明は[ここ](https://ja.javascript.info/fetch-crossorigin) が詳しいです。
CORSの考え方自体は[こちら](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS) を参考。


## Nodeからの実行

### Nodeのインストール

今回のこのエラーを回避するために使用するサーバーとしてブラウザとほぼ同じようにJavaScriptが使用できる「Node」を使用します。

Nodeについての詳細は、[N予備校サーバーサイドプログラミング入門](https://www.nnn.ed.nico/courses/999/chapters/13382
)の02節を確認してください。(Dockerの部分などの理解は現状では不要です)

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

### package.jsonの作成とnodeコマンドの実行

Nodeのインストールが実行出来たら、GoogleChromeのデベロッパーツールで実行したものと同等のことを行ってみましょう

`index.js` という名前でファイルを作成して、下記の内容で保存します。
APIKeyの部分はデモで発行したものに書き換えてください。

index.js
```js
import fetch from "node-fetch";
import FormData from "form-data";

const formdata = new FormData();
formdata.append('apikey', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query', 'おはよう');

const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk', {
    method: 'post',
    body: formdata,
});

const json = await response.json();
console.log(json);
```

次に `package.json` を下記の内容で作成してください。
(このファイルは `index.js` と同じディレクトリ内にある必要があります。)

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
        "form-data": "^4.0.0",
        "node-fetch": "^3.1.0"
    }
}
```

作成したら `package.json` と同じディレクトリで下記のコマンドを実行してください
```
npm install
```

エラーなく完了したら、下記のコマンドを試してみましょう。
```
node index.js
```

警告などがでるかもしれませんが、下記のようにcurlを実行したときと同じような結果が得られるはずです。
```
{
  status: 0,
  message: 'ok',
  results: [ { perplexity: 0.07743213382788067, reply: 'おはようございます' } ]
}
```

## Nodeでサーバーの実行

次はNodeでサーバーを実行して、Webページを配信できる状態を作ります。
補足: サーバーとして「[express](https://expressjs.com/ja/)」というWebフレームワークを使用します。

まずは、`package.json` を下記のように修正します。

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
        "express": "^4.17.2",
        "express-form-data": "^2.0.17",
        "form-data": "^4.0.0",
        "node-fetch": "^3.1.0"
    }
}
```

作成したら `package.json` と同じディレクトリで下記のコマンドを実行してください
```
npm install
```

ここからは `index.js` を作り替えていきます。
最初にサーバーの動作確認をします。 `index.js` を下記のように変更してください。

index.js
```js
import path from 'path';
import express from 'express';
import fetch from 'node-fetch';
import expressFormData from 'express-form-data';
import FormData from 'form-data';

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

この状態で、GoogleChromeのアドレスバーに `http://localhost:3000/api` と入力してみましょう。
下記の画像のように出れば成功です。

![googlechrome_nodeserver_test](https://user-images.githubusercontent.com/26959415/146932901-cfcc9ac1-00e6-42b3-8971-a353a39d8a72.png)

 一度サーバーを終了させます。
 コンソールに移って、「Ctrl+C」を押してください。
再度コンソールに文字が入力できる状態になっていればOKです。


次に作成したWebページ(HTMLなど)を表示します。
まずは、`index.js` と同じディレクトリに `public` というディレクトリを作成してください。
そしてその中に `index.html`, `main.js` を作成してください。
(これらは、「JavaScriptファイルからの実行」の節で作成したものを移動しても構いません。)

下記のようなディレクトリの状態になっていればOKです。

![vscode_directory_test](https://user-images.githubusercontent.com/26959415/146932945-d96beb75-abcf-444b-aed3-031ceb75de24.png)

`public`ディレクトリ内の `index.html` と `main.js` の内容は下記のようにしておいて下さい

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
formdata.append('apikey', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
formdata.append('query', 'おはよう');

const response = await fetch('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk', {
    method: 'post',
    body: formdata,
});

const json = await response.json();
console.log(json);

const result = document.getElementById("result");
result.innerHTML = `${json.results[0].reply}`;
```

サーバーがこれらのファイルを配信できるように `index.js` を書き換えます。

index.js
```js
import path from 'path';
import express from 'express';
import fetch from 'node-fetch';
import expressFormData from 'express-form-data';
import FormData from 'form-data';

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

この状態で次は、GoogleChromeのアドレスバーに `http://localhost:3000` と入力してみましょう。
下記の画像のように出れば成功です。コンソールで「Ctrl+C」でサーバーを終了させてください。

![googlechrome_nodeserver_testhtml](https://user-images.githubusercontent.com/26959415/146932976-3b81d5df-cff7-4f6f-81df-349b10a8d1bb.png)


## 一連の流れを作る

もう一度エラーが発生したときに示した図を確認します。

![test](https://user-images.githubusercontent.com/26959415/146918576-7870b056-6431-4aca-8b28-1aa4337190e1.png)

最後に、この図の流れに沿うように作っていきます。

まずはGoogleChromeからのリクエスト部分です。
`public`ディレクトリ以下の `main.js` を修正します。(`index.html`はそのままでOK)

main.js
```js
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
```

次に `index.js` を下記のように修正します。

index.js
```js
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
```

変更出来たらまた下記のコマンドを実行してください
```
node index.js
```

また、GoogleChromeのアドレスバーに `http://localhost:3000` と入力してみましょう。
GoogleChromeで下記の画像のようになれば成功です。
(「おはようございます」が表示されるまで少し時間がかかることがあります。)

![googlechrome_nodeserver_testresponse](https://user-images.githubusercontent.com/26959415/146942438-4145ad4b-8545-4bd9-b283-b0563cfbc177.png)

コンソールは下記の画像のようになっていると思います。

![console_nodeserver_testresponse](https://user-images.githubusercontent.com/26959415/146942429-fab9a2f9-8253-470d-bfb0-ac87ef297882.png)

これで目的としていた一連の流れを作ることができました。


## 追加課題

ここから、最初のデモののようにWebページでAPIトークンの入力できるようにしたり、TalkAPIにリクエストする文字列(今まではすべておはよう)をキーボードの入力されたものにするような変更をしてみましょう。
