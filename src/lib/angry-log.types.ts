import { AngryLogger } from "./angry-log.logger";

export type AngryLogTitle = string | object;
export type AngryLogger = AngryLogger;
export interface LoggerOptions {
    condition?: boolean;
    title?: AngryLogTitle;
    URL?: string;
}
