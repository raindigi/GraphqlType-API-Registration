import { ClassType, Field, InputType } from "type-graphql";

// tslint:disable-next-line:typedef
export const OkMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class OkInput extends BaseClass {
    @Field()
    ok: boolean;
  }
  return OkInput;
};