import fs from 'fs';
import { print } from 'graphql';
import path from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const loadedFiles = loadFilesSync(
	path.join(__dirname, "./schema/**/*.graphql"),
	{
		// extensions: ["graphql"],
		recursive: true,
		ignoreIndex: true,
	}
);

const typeDefs = mergeTypeDefs(loadedFiles);
const schema = print(typeDefs);
fs.mkdirSync("./src/generated/schema", { recursive: true });
fs.writeFileSync("./src/generated/schema/combinedSchema.graphql", schema);

export { typeDefs };
export default schema;
