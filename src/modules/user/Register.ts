import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    // tslint:disable-next-line:typedef
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(@Arg("data")
    {
        email,
        firstName,
        lastName,
        password
    }: RegisterInput): Promise<User> {
        // tslint:disable-next-line:typedef
        const hashedPassword = await bcrypt.hash(password, 12);

        // tslint:disable-next-line:typedef
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }
}