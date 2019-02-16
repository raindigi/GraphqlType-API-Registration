import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";

import { createSchema } from "../utils/createSchema";

// tslint:disable-next-line:interface-name
interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    userId?: number;
}

let schema: GraphQLSchema;

// tslint:disable-next-line:typedef
export const gCall = async ({ source, variableValues, userId }: Options) => {
    if (!schema) {
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    userId
                }
            },
            res: {
                clearCookie: jest.fn()
            }
        }
    });
};