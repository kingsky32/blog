import { createContext } from '#graphql/context';
import { createSchema } from '#graphql/schema';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { RequestHandler } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';

const cors: (handler: RequestHandler) => RequestHandler = Cors();
const schema = await createSchema();

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<any> {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);

  return true;
});

export const config = {
  api: {
    bodyParser: false,
  },
};
