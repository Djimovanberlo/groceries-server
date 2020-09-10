import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Product } from "./entities/Product";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  console.log("dirname: ", __dirname);
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

// const newProduct = orm.em.create(Product, { name: "Pasta" });
// await orm.em.persistAndFlush(newProduct);
// const product = await orm.em.find(Product, {});
// console.log("PRODUCT:", product);

main().catch((err) => {
  console.error(err);
});

console.log("HELLO GROCERIES");

// guide: https://www.youtube.com/watch?v=I6ypD7qv3Z8&feature=youtu.be
// ~35:00
