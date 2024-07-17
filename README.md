# カレーレシピ生成アプリ
## 概要
- 上部のドロップダウンメニューから、用いる食材を選択
- Sendボタンを押して、選択した食材を用いたカレーのレシピを生成

## (開発用)環境構築
### データベース関連
- mysqlをインストールしサーバー起動
- (要追記)必要なデータベース、テーブル名等
### curry-app/での操作
- ```npm install express```
- ```npm install -g nodemon```
- ```npm install mysql2```
- ```npm install dotenv```
- .envファイルを作成し、　```DB_PASSWORD={mysql password}```　を追加 ( {mysql password} にはmysqlに登録したパスワードを入れる)
  - 例:```DB_PASSWORD=ABCDEFG```
### curry-app/frontend/での操作
- .envファイルを作成し、　```REACT_APP_GOOGLE_API_KEY={Gemini API Key}```　を追加 ( {Gemini API Key} には利用者が取得したAPI Keyを入れる)
  - 例：```REACT_APP_GOOGLE_API_KEY=ABCDEFG```
- 外部ライブラリのインストール
  - ```npm install axios```
  - ```npm install react-markdown```
  - ```npm install react-select```

## (開発用)起動方法
- mysqlサーバー起動(コマンドは環境による)
- バックエンド(express)起動：curry-app/で ```npm run start-node```
- フロントエンド(react)起動：curry-app/frontend/で ```npm start```

## 注意
- wsl環境ではapiにアクセスできない