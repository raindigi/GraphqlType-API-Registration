import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordMixin } from "../../shared/PasswordInput";
// tslint:disable-next-line:comment-format
//import { IsMobileAlreadyExist } from "./isMobileAlreadyExist";
@InputType()
export class RegisterInput extends PasswordMixin(class { }) {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "email already in use" })
    email: string;

//    @Field()
//     @IsMobilePhone("IN")
//     @IsMobileAlreadyExist({ message: "mobile number already in use" })
//     mobile:string;
}