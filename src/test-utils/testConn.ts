import { createConnection } from "typeorm";

// tslint:disable-next-line:typedef
export const testConn = (drop: boolean = false) => {
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "typegraphql_exmaple_test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname+"/../entity/*.*"]
    });
};