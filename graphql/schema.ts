import path from 'path';
import { GraphQLSchema } from 'graphql';
import { TypeSource } from '@graphql-tools/utils';
import { loadFiles, loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

export async function createSchema(): Promise<GraphQLSchema> {
  const typesArray: TypeSource = loadFilesSync(
    path.join(process.cwd(), '/graphql/api/**/*.graphql'),
  );
  const resolversArray: any[] = await loadFiles(
    path.join(process.cwd(), '/graphql/api/**/*.resolver.ts'),
    {
      requireMethod: (data: string): any =>
        import(`./${path.relative(`${process.cwd()}/graphql`, data)}`),
    },
  );

  return makeExecutableSchema({
    typeDefs: mergeTypeDefs(typesArray),
    resolvers: mergeResolvers(resolversArray),
  });
}
