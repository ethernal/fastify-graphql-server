Delightful developer experience is all I want when building backend. Customized and easily explainable configurations without tons of magic are rare. I have spend few evenings creating this template and I do hope it will allow me and you to start with complete stack required by small and medium projects.

# What is this template?

This template should provide you with a very fast GraphQL server that uses non-mainstream packages:

*  Fastify as the server.
*  Mercurius as GraphQL server.
*  Prisma as database connector and query builder.
*  Typescript to have better developer experience code completion and less bugs.
*  Typescript configured for "modern" output.
*  Auto-generated typings for resolvers by mercurius-codegen.
*  Auto-merged resolvers can be imported from `mergedResolvers` file as `resolvers` as long as all functions are inside `resolvers` folder.
*  Auto-generated schema from partial files in 'graphql' folder.
*  Jest as a test runner configured to work with Typescript.
*  Integration / end-to-end testing done with Jest and `mercurius-integration-testing` package.
# How does it work?

To start building clone this repo and run `yarn` you can use `npm` if you want. All the dependencies are installed inside the `node_modules` , no global packages are assumed to exist.

After installing all the dependencies run `yarn test` . If all goes well the tests should pass. If it does not please fill out the issue I want you to have a great time using this template.

# Connecting to GraphQL server

If you are using a standalone tool (Altair, GraphQL Playground) to connect to the GraphQL server use the:
`http(s)://[serverName/IP]:[ServerPort]/graphql` to establish connection to it.

## How do I start coding?

### Database

```bash
root/prisma/schema.prisma
```

In `rootFolder/prisma/schema.prisma` you can define your data model.
Please refer to the Prisma docs for information on how to define models for you DB. The example provided is just for guidance and should be enough to get you started.

Schema is migrated in development mode with `migrate` command ex. `yarn migrate` .

### API

```bash
src/graphql/schema/*.graphql
```

GraphQL is used as API layer. The server starts with GraphiQL environment. GraphQL Playground was removed from mercurius.

Very simple code examples are also provided to show how code can be structured. The goal here was to allow a developer to write smaller chunks of functionality that would be automatically merged together during compilation or build.

### Resolvers / Execution Code for API

```bash
src/resolvers/**/[API-function].ts
```

While the GraphQL APi is a definition of the functionality, the resolvers are the "how" of it. They define how to fetch the data from the DB if needed or calculate/run functions that are expected to achieve a result.

Resolvers are deep merged and exported by `mergedResolvers.ts` from root of `resolvers` directory ex.

```js
import resolvers from './resolvers/mergedResolvers;
```
