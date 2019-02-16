import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    await conn.close();
});

// tslint:disable-next-line:typedef
const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
    it("create user", async () => {
        // tslint:disable-next-line:typedef
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        // tslint:disable-next-line:typedef
        const response = await gCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        });

        expect(response).toMatchObject({
            data: {
                register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });

        // tslint:disable-next-line:typedef
        const dbUser = await User.findOne({ where: { email: user.email } });
        expect(dbUser).toBeDefined();
        expect(dbUser!.confirmed).toBeFalsy();
        expect(dbUser!.firstName).toBe(user.firstName);
    });
});