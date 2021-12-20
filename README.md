# talk-api

## 完成デモ
まずはここでAPIKeyを発行してください（メールアドレスが必要です）
https://a3rt.recruit.co.jp/product/talkAPI/registered/

メールアドレスにAPIKeyが送られてきたら、下記のページでデモを試してみましょう。
https://a3rt.recruit.co.jp/product/demo/talkAPI_demo1/index.html

## 何をするか
インターネット上に公開されている様々なAPIを使用する方法を学ぶ

## API （Application Programming Interface） とは

https://wa3.i-3-i.info/word12428.html

https://developer.mozilla.org/ja/docs/Glossary/API

詳解； https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Introduction

コンピュータ間やプログラム間でのやりとりする際の決め事全般を指す。

例えば、人間同士でも海外の人とオンラインミーティングのスケジュールを調整することを考えると、
ミーティングの時間を決める前にどこ時間で話すのかを決める必要があります。（日本時間？アメリカ時間？インド時間？）

コンピュータは人間ほどに融通が聞かないので、そのタイミングでどこ時間と伝えるのではなく、
先にどこ時間で聞いてくださいと決めていたりします。
こういった他のコンピュータに対して質問したりする際の決め事をAPIの元の意味としてあります。

しかしながら、現状プログラミングを行う際のAPIというのはさらに広い意味で使われることが多いです。
その中でも今回は WebAPIを使っていきます。

## Web API

>厳格な定義はないが、広義にはHTTPプロトコルを用いてネットワーク越しに呼び出すアプリケーション間、システム間のインターフェースのこと。
> APIの機能はわかっているけれども、その中身の実際の動作は詳しくわからない(知らなくてもよい)機能の塊を、外部から呼び出す仕様のことを指す。また、上記図の右側の「呼ばれる側のシステム」そのものをWeb APIと呼ぶこともある。
from* https://qiita.com/NagaokaKenichi/items/df4c8455ab527aeacf02

インターネットを介してやりとり行うAPI。
その中でも広く使われているHTTP通信を用いてやりとりするもののことを今回は使ってやっていきます。

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
（画像）

開けたらコンソールに入力できると思います。

ここはN予備校の「JavaScript体験」を参考にしてください。
https://www.nnn.ed.nico/contents/guides/5181#how-to-open-console

ここではJavaScriptが実行できるので、上記の 「cURL」で行ったことを実行してみましょう。
JavaScriptからリクエストを送る際は「fetch」という関数を使用します。

fetch: https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch

下記のようにコンソールに入力して実行してみてください。
```
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

失敗する
CORSの補足をする
https://ja.javascript.info/fetch-crossorigin

### Nodeから実行する

Nodeについて → N予備校の項目を参照

Nodeのインストール方法
Win/ Mac でバージョン固定

npm init して、必要なpackageを入れる
n予備校でやってるから参考にする





## HTTP通信
N予備校入門コースの2章の10節 HTTP通信を確認しよう。
→ https://www.nnn.ed.nico/courses/999/chapters/13381

必要な知識
HTTPリクエスト（メッセージ）
	https://developer.mozilla.org/ja/docs/Web/HTTP/Messages
JavaScriptでのHTTPリクエスト
	https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
	ajax, fetch
	以下でとりあえずリクエストできる

```
 const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
 console.log(await response.json())
```

リクエストヘッダー
	APIを使うときの認証とか
	ない場合もあるが、ほとんどある気がする
	https://developer.mozilla.org/ja/docs/Web/HTTP/Headers

CORS
	提供APIを使っている場合は問題は起こりにくいが、自分でサーバー立ててる時にエラーが起こる原因
	https://developer.mozilla.org/ja/docs/Web/HTTP/CORS

実際に使うAPI
Talk API https://a3rt.recruit.co.jp/product/talkAPI/
文字列を渡すと、ぼっとが返事をレスポンスとして返してくれる
