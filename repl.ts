// 開発の際にREPL代わりに使用するファイル
// ロジックの動作確認などに使う
// 以下のコマンドで起動
// 「docker-compose exec web bun run --hot repl.ts」もしくは「make repl」

////// ここにコードを書く //////

import { Repository as UserRepository } from "@/schemas/models/users";

const userRepository = new UserRepository();

////////   ここまで   ////////

process.exit();