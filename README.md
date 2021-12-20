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

## 実際にWeb APIを使ってみましょう。
TalkAPIもWebAPIの一つです。
デモで発行したAPIKeyを使用して、リクエストを送ってみましょう。

### [cURL](https://curl.se/)
まずは自分のパソコンのコンソールからリクエストを送る方法として、`cURL`というコマンドラインツールを使います

#### Windowsでのインストール
コマンドプロンプトを立ち上げ下記のコマンドを実行してください
```
```




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


API拡張の検証
[JavaScriptから公開APIを使ってみる]
https://github.com/npo-clack/talk-api
12/14 ちょっとAPIについて書いた
curlの例あってもいいかも
何ができるのか等言及する？
説明より先に実際に実行するコマンドなどを優先度上
生徒ではなく、講師が見てできるようにするのを先に
年末年始に渡せるように  12/21の回までに作る[kannan.icon]
高校生向けの説明は後から追加の順番
APIの説明とかあると良さそう
例：https://wa3.i-3-i.info/word12428.html



# Tips パッケージ管理ソフトのインストール

この課題ではWindowsではコマンドプロンプト、Macではターミナルというコンソールを使用します。
ここでのコンソールとは、キーボードの入力のみで制御を行うツールです。

これ以降でコンソールという言葉が出てきたら、Windowsではコマンドプロンプト、Macではターミナルと考えてください。

## 事前準備
この課題ではコンソール上でソフトウェアを動かすことがあります。
こういったコンソール上で使用するソフトウェアをコマンドラインツールと呼んだりします。
そういったコマンドラインツールのインストールを簡単にしてくれるのがパッケージ管理ソフトです。
まずはパッケージ管理ソフトを導入します。

### Windowsの場合

[Chocolatey](https://chocolatey.org/) というソフトをインストールします。
`Windows PowerShell` を管理者モードで立ち上げます。

Windowsマークを右クリックすると下記の画像のような表示が出てくるので、そこから Windows PowerShell(管理者) をクリックしてください。
（画像で示す）

立ち上がる時に権限許可を求められるので、「はい」を選んでください。

立ち上がったWindows PowerShell に下記のコマンドをコピペしてください。
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
Enter を押下し、途中でインストールの可否を求められたりするので「y」を入力してEnterを押して進めてください。

インストールが終わったら念のため再起動して、コマンドプロンプト上で下記を実行してエラーが出ないことを確認してください。
```
choco -v
```

### Macの場合

[brew](https://brew.sh/index_ja) というソフトをインストールします。
`ターミナル` を立ち上げます。

立ち上がったターミナルに下記のコマンドをコピペしてください
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Enter を押下し、途中でインストールの可否を求められたりするので「y」を入力してEnterを押して進めてください。

インストールが終わったら、ターミナル上で下記を実行してエラーが出ないことを確認してください。
```
brew -v
```