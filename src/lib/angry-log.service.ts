import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { LoggerOptions } from "./angry-log.types";
import { AngryLogger } from "./angry-log.logger";

@Injectable()
export class AngryLogService extends AngryLogger {
    constructor(http: Http) {
        super(http);
    }

    public instantiateLogger(options?: LoggerOptions): AngryLogger {
        let logger: AngryLogger = new AngryLogger(this.http);

        if (!options) {
            return logger;
        }

        for (let key of Object.keys(options)) {
            logger[key] = options[key];
        }

        return logger;
    }
}
