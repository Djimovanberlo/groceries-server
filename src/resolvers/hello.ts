import { Resolver, Query } from "type-graphql";

import { Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello resolver";
  }
}
