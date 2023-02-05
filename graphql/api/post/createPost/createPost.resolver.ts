import { Context, Resolver } from 'graphql';
import Upload from 'graphql-upload/Upload';

export default {
  Mutation: {
    createPost: (
      _source: any,
      args: {
        title: string;
        description: string;
        contents: string;
        file: Upload;
      },
      { user }: Context,
    ) => {
      console.log(args, user);
    },
  },
} as Resolver;
