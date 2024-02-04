# [WIP]ディレクトリ構成

## schemas

- それぞれの型・バリデーションを定義する

### db

- drizzle によるテーブル定義、マイグレーションファイル
  - これを元にテーブルが作成される
- テーブルごとにファイルを作る
  - drizzle.config.ts を編集してこのディレクトリすべてを対象とするようにしておく
- models は drizzle-zod を使ってこれを元に型定義する

### models

- モデルを担当
- drizzle-zod を使ってマイグレーションファイルをベースにする
  - マイグレーションファイルでは足りないルールのみ追加する

### requests

- リクエストを担当
- routes に対応させる？

### responses

- レスポンスを担当
- routes に対応させる？

## routes

- API エンドポイントを実装する
- hono v4 で実装予定のファイルベースルーティングを採用

### server.ts

- bun run --hot コマンドのエントリーポイント

# Bun

## Bun のインストール（WSL2/Ubuntu）

- WSL を開きます。
- Ubuntu を起動します。
- unzip がインストールされていることを確認します。インストールされていない場合は、`sudo apt install unzip`を実行してインストールします。
- 次のコマンドを実行して Bun のインストールスクリプトをダウンロードします: `curl -fsSL https://bun.sh/install | bash`
- ファイルの末尾に次の行を追加して Bun のパスを通します: `echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc`
- 変更を適用するために、`source ~/.bashrc`を実行します。
- `bun --version`を実行して Bun が正しくインストールされ、パスが通っていることを確認します。

# hono

## hono のインストール

- WSL を開きます。
- Ubuntu を起動します。
- Bun がインストールされていることを確認します。インストールされていない場合は、Bun のインストール手順に従ってインストールしてください。
- 次のコマンドを実行して hono をインストールします: `bun add hono`
- インストールが完了したら、`bun hono --version`を実行して hono が正しくインストールされていることを確認します。

# プロジェクトの作成

- WSL を開きます。
- Ubuntu を起動します。
- Bun がインストールされていることを確認します。インストールされていない場合は、Bun のインストール手順に従ってインストールしてください。
- 次のコマンドを実行して、hono プロジェクトの雛形を作成します: `bun create hono`
- プロジェクト名を入力します
- デプロイ先を選択します。ここでは cloudflare-workers とします。
- しばらく待つとプロジェクトの作成が完了します。
- 作成されたプロジェクトのディレクトリに移動します。例えば、`cd my-hono-project`を実行します。
- プロジェクトの依存関係をインストールします。ディレクトリ内で`bun install`を実行します。
- `mkdir src/routes`でファイルベースルーティング用のディレクトリを作成します。
- `mv src/index.ts src/routes/server.ts`でエントリーポイントを変更します。
- `tsconfig.json`に`baseUrl`と`@`を定義しておきます。
- プロジェクトが正しく作成されたことを確認するために、`bun run --hot src/routes/server.ts`を実行してローカルサーバーを起動します。
- ブラウザを開き、`http://localhost:3000`にアクセスして、hono プロジェクトが正しく動作していることを確認します。

# D1

- 予め cloudflare に登録しておきます。
- `bunx wrangler login`を実行し、ブラウザが開いたら cloudflare にログインして認証します。
  - wrangler.toml が作成されます。
- `bunx wrangler d1 create hono-db`で D1 のデータベースを作成します
  - `hono-db`部分は適宜変更してください。
- コマンド実行後に表示されるデータベース情報（[[d1_databases]]）を wrangler.toml に記述します

# drizzle(d1)

- `bun add drizzle-orm drizzle-zod`で
- `bun add -D drizzle-kit`で
- `touch .env`で
- `touch drizzle.config.ts`で
- `mkdir src/schemas`で
- `mkdir src/schemas/db`で
- `touch src/schema/db/commonColumns.ts`で
- `touch src/schema/db/tables/user.ts`で
- `touch db.ts`でファイルを作成し、DB クライアントとの接続処理を追加します。
- `bunx drizzle-kit generate:sqlite`でsqliteのマイグレーションファイルを作成します。
- `bunx wrangler d1 migrations apply hono-db --local`でマイグレーションファイルを実行します。
- `docker-compose up`で docker コンテナをビルド・起動します
- 次のコマンドでレスポンスが返ってくることを確認します
  -- ※Content-Type が`application/x-www-form-urlencoded`の状態だと`c.req.parseBody()`を使用する必要がある

```
curl -X POST http://localhost:3000/users/post \
     -H "Content-Type: application/json" \
     -d '{"password": "hogefuga"}'
```

## zod-openapi

- `bun add hono zod @hono/zod-openapi`
- `mkdir src/schema`でスキーマ用ディレクトリを作成します。
- `touch src/schema/user.ts`で User の Schema ファイルを作成します。
- `mkdir src/routes/users`で user の api 用ディレクトリを作成します。
- `touch src/users/myPage.ts`で user の api ファイルを作成します。
  -- `sample/src/schema/user.ts`を参考に内容を記述します。

# 参考

- Bun + hono + zod-openAPI
  https://github.com/openstatusHQ/openstatus/tree/main

- drizzle-kit
  https://zenn.dev/satonopan/articles/9182a9eda4d574

- drizzle-zod
  https://zenn.dev/mt_southern/scraps/e6f4d256f07353

- drizzle D1
  https://qiita.com/kmkkiii/items/2b22fa53a90bf98158c0

- swagger-ui Prism
  https://zenn.dev/kigi/articles/bb446df063ff54
