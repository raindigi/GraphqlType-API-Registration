import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

import { User } from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    // tslint:disable-next-line:typedef
    validate(email: string) {
        return User.findOne({ where: { email } }).then(user => {
            if (user) { return false; }
            return true;
        });
    }
}

// tslint:disable-next-line:typedef
export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    // tslint:disable-next-line:typedef
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
    };
}