> Beware There Be Dragons!
> This is a work in progress project.
> It is usable as is but is missing some features I think are required for any serious server.

Delightful developer experience is all I want when building backend. Customized and easily explainable configurations without tons of magic are rare. I have spend few evenings creating this template and I do hope it will allow me and you to start with complete stack required by small and medium projects.

# What is this template?

This template should provide you with a very fast GraphQL server that uses non-mainstream packages:

*  Fastify as the server.
*  Mercurius as GraphQL server.
*  Prisma as database connector and query builder.
*  Typescript to have better developer experience code completion and less bugs.
*  Typescript configured for "modern" output.
*  Auto-generated typings for resolvers by mercurius-codegen.
*  Auto-merged resolvers can be imported from `mergedResolvers` file as `resolvers` as long as all functions are inside `resolvers` folder and follow `fileName.resolver.ts` naming scheme.
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

## Adding custom scalar GraphQL type

If yo want to add custom scalar type that will be accepted by GraphQL you need to:

*  Declare a scalar in `.graphql` file in `schema` directory so that Mercurius knows to register one and define or import resolver for the field type.

Required fields now are imported from `graphql-scalars` package. If you need the ones that have not been defined you need to adjust the configuration to your needs.

Scalars are imported and defined in `resolvers/Scalars/scalars.resolver.ts` .

# Next Planned Tasks

Improve documentation and examples in README.
Implement authentication and authorization.

# Latest Features

Seeding works now with Prisma Connect.

# Known issues

None at the moment of writing..

# Planned Features

File Upload with mercurius-upload.
Serving uploaded files with fastify-static.
Authentication with mercurius-auth.
Possibly more (all?) scalars for GraphQL.

# Random Quote

Through action, a man becomes a hero.
Through death, a hero becomes a legend.
Through time, a legend becomes a Myth.
And by learning from the Myth, a man takes action.

Source: https://www.youtube.com/watch?v=tEz1W_O2heU
