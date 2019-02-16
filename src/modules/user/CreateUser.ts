import {
    Resolver,
    Mutation,
    Arg,
    ClassType,
    InputType,
    Field,
    UseMiddleware
} from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";
import { Product } from "../../entity/Product";
import { Middleware } from "type-graphql/interfaces/Middleware";

// tslint:disable-next-line:typedef
function createResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    entity: any,
    middleware?: Middleware<any>[]
) {
    @Resolver()
    class BaseResolver {
        @Mutation(() => returnType, { name: `create${suffix}` })
        @UseMiddleware(...(middleware || []))
        // tslint:disable-next-line:typedef
        async create(@Arg("data", () => inputType) data: any) {
            return entity.create(data).save();
        }
    }

    return BaseResolver;
}

@InputType()
class ProductInput {
    @Field()
    name: string;
}

// tslint:disable-next-line:typedef
export const CreateUserResolver = createResolver("User",User,RegisterInput, User);
// tslint:disable-next-line:typedef
export const CreateProductResolver = createResolver("Product",Product,ProductInput, Product);