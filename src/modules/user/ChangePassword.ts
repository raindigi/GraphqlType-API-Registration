import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data")
        { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        // tslint:disable-next-line:typedef
        const userId = await redis.get(forgotPasswordPrefix + token);

        if (!userId) {
            return null;
        }

        // tslint:disable-next-line:typedef
        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(forgotPasswordPrefix + token);

        user.password = await bcrypt.hash(password, 12);

        await user.save();

        ctx.req.session!.userId = user.id;

        return user;
    }
}