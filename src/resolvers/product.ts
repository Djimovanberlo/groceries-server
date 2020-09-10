import { Resolver, Query, Ctx } from "type-graphql";
import { Product } from "../entities/Product";
import { MyContext } from "../types";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(@Ctx() { em }: MyContext): Promise<Product[]> {
    return em.find(Product, {});
  }
}
