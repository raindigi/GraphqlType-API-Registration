import { Stream } from "stream";

// tslint:disable-next-line:interface-name
export interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}