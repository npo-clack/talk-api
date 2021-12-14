# talk-api

## 何をするか
インターネット上に公開されている様々なAPIを使用する方法を学ぶ

## API （Application Programming Interface） とは
https://e-words.jp/w/API.html

> APIとは、あるコンピュータプログラム（ソフトウェア）の機能や管理するデータなどを、外部の他のプログラムから呼び出して利用するための手順やデータ形式などを定めた規約のこと。

他のコンピュータとやりとりする際の決め事全般を指す。

例えば、人間同士でも海外の人とオンラインミーティングのスケジュールを調整することを考えると、
ミーティングの時間を決める前にどこ時間で話すのかを決める必要がある。（日本時間？アメリカ時間？インド時間？）


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



Nodeについて → N予備校の項目を参照

Nodeのインストール方法
Win/ Mac でバージョン固定

npm init して、必要なpackageを入れる
n予備校でやってるから参考にする

JSの解説をする
