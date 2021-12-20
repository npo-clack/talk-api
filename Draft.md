# コラム：プログラマの仕事の一つ
実際にこういったAPIがすでに開発済みで、このAPIを使用してブラウザに表示するものを決めるというのは一般的な仕事


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
