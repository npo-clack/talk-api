# talk-api

## 完成デモ
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

## 実際にWeb APIを使ってみましょう。

### Curl

### console javascript

### ローカルJavascript

失敗する
CORSの補足をする

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


コラム：プログラマの仕事の一つ
実際にこういったAPIがすでに開発済みで、このAPIを使用してブラウザに表示するものを決めるというのは一般的な仕事

