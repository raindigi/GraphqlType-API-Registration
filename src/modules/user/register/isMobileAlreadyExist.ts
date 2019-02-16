import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { User } from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsMobileAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    // tslint:disable-next-line:typedef
    validate(mobile: string) {
        return User.findOne({ where: { mobile } }).then(user => {
            // tslint:disable-next-line:curly
            if (user) return false;
            return true;
        });
    }
}

// tslint:disable-next-line:typedef
export function IsMobileAlreadyExist(validationOptions?: ValidationOptions) {
    // tslint:disable-next-line:typedef
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsMobileAlreadyExistConstraint
        });
    };
}