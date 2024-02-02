

# Bun

## Bunのインストール（WSL2/Ubuntu）

- WSLを開きます。
- Ubuntuを起動します。
- unzipがインストールされていることを確認します。インストールされていない場合は、`sudo apt install unzip`を実行してインストールします。
- 次のコマンドを実行してBunのインストールスクリプトをダウンロードします: `curl -fsSL https://bun.sh/install | bash`
- ファイルの末尾に次の行を追加してBunのパスを通します: `echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc`
- 変更を適用するために、`source ~/.bashrc`を実行します。
- `bun --version`を実行してBunが正しくインストールされ、パスが通っていることを確認します。


# hono

## honoのインストール

- WSLを開きます。
- Ubuntuを起動します。
- Bunがインストールされていることを確認します。インストールされていない場合は、Bunのインストール手順に従ってインストールしてください。
- 次のコマンドを実行してhonoをインストールします: `bun add hono`
- インストールが完了したら、`bun hono --version`を実行してhonoが正しくインストールされていることを確認します。

# プロジェクトの作成

- WSLを開きます。
- Ubuntuを起動します。
- Bunがインストールされていることを確認します。インストールされていない場合は、Bunのインストール手順に従ってインストールしてください。
- 次のコマンドを実行して、honoプロジェクトの雛形を作成します: `bun create hono`
- プロジェクト名を入力します
- デプロイ先を選択します。ここではcloudflare-workersとします。
- しばらく待つとプロジェクトの作成が完了します。
- 作成されたプロジェクトのディレクトリに移動します。例えば、`cd my-hono-project`を実行します。
- プロジェクトの依存関係をインストールします。ディレクトリ内で`bun install`を実行します。
- `mkdir src/routes`でファイルベースルーティング用のディレクトリを作成します。
- `mv src/index.ts src/routes/server.ts`でエントリーポイントを変更します。
- `tsconfig.json`に`baseUrl`と`@`を定義しておきます。
- プロジェクトが正しく作成されたことを確認するために、`bun run --hot src/routes/server.ts`を実行してローカルサーバーを起動します。
- ブラウザを開き、`http://localhost:3000`にアクセスして、honoプロジェクトが正しく動作していることを確認します。

## zod-openapi

- `bun add hono zod @hono/zod-openapi`
- `mkdir src/schema`でスキーマ用ディレクトリを作成します。
- `touch src/schema/user.ts`でUserのSchemaファイルを作成します。
- `mkdir src/routes/users`でuserのapi用ディレクトリを作成します。
- `touch src/users/api.ts`でuserのapiファイルを作成します。
-- `sample/src/schema/user.ts`を参考に内容を記述します。

# drizzle(pg)