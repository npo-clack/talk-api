# talk-api

何をするか
　インターネット上に公開されているAPIを使用する方法を学ぶ

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



Nodeについて →　N予備校の項目を参照

Nodeのインストール方法
　Win/ Mac でバージョン固定

npm init して、必要なpackageを入れる
　n予備校でやってるから参考にする

JSの解説をする
