// 開発の際にREPL代わりに使用するファイル
// ロジックの動作確認などに使う
// 以下のコマンドで起動
// 「docker-compose exec web bun run --hot repl.ts」もしくは「make repl」

console.info("\n------ START REPL\n");

////// ここにコードを書く //////

import { UserRepository } from "@/schemas/models/users";
import { PostRepository } from "@/schemas/models/posts";

// const userRepository = UserRepository;

const postInstance = await PostRepository.newValues();

console.log('postInstance:', postInstance);

const post = await PostRepository.findById(1);

console.log('post:', post);

////////   ここまで   ////////

console.info("\n----- END REPL\n");

process.exit();