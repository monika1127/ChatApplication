import { setContext } from "@apollo/client/link/context";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  InMemoryCache,
  split,
  createHttpLink,
} from "@apollo/client";

const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjE1MDY5OTIsImlhdCI6MTYxOTA4Nzc5MiwiaXNzIjoiY2hhdGx5IiwianRpIjoiMzE0MWIyY2QtY2FiZC00NjM0LWE4OTktYjYwOGVlYTExYTQzIiwibmJmIjoxNjE5MDg3NzkxLCJzdWIiOiI4YTU3ZjVhNC0wZDI5LTRiMjctOWNmYS0xMDY0MjA2NzFlM2MiLCJ0eXAiOiJhY2Nlc3MifQ.WYcygeWYanbAzti_6rJT0JRLLj8ZpuRPXfBivqBwQko4Wu-Gpiiz29UbxCtevYTsTweMwkO6Fm0Mdboj9BhGTg";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphiql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const authedHttpLink = authLink.concat(httpLink);

const phoenixSocket = new PhoenixSocket(
  "wss://chat.thewidlarzgroup.com/socket",
  { params: () => ({ token }) }
);

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const websocketLink = createAbsintheSocketLink(absintheSocket);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  websocketLink,
  authedHttpLink
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});
