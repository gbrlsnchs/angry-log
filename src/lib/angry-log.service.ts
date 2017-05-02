import { isDevMode, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class AngryLogService {
    public assert: Function;
    public clear: Function;
    public condition: boolean;
    public count: Function;
    public debug: Function;
    public dir: Function;
    public dirxml: Function;
    public error: Function;
    public exception: Function;
    public group: Function;
    public groupCollapsed: Function;
    public groupEnd: Function;
    public info: Function;
    public log: Function;
    public msIsIndependentlyComposed: Function;
    public profile: Function;
    public profileEnd: Function;
    public select: Function;
    public table: Function;
    public time: Function;
    public timeEnd: Function;
    public trace: Function;
    public warn: Function;
    public URL: string;
    private http: Http;

    constructor(http: Http) {
        this.condition = isDevMode();
        this.http = http;
        this.wrapConsole();
    }

    private wrapConsole(): void {
        for (let key of Object.keys(window.console)) {
            this[key] = this.resolveFunc(key);
        }
    }

    private resolveFunc(attrName: string): Function {
        let attr: Function = window.console[attrName];
        let isFunction: boolean = typeof attr === "function";

        if (attr && this.condition) {
            if (isFunction) {
                return attr.bind(window.console);
            }

            return attr;
        }

        if (this.URL && attrName === "error") {
            return this.remoteLog;
        }

        return (): void => {};
    }

    private remoteLog(message: string): Observable<Response> {
        return this.http.post(this.URL, { message })
            .map((response: Response): Response => response.json())
            .catch((response: Response): ErrorObservable<Response> => Observable.throw(response.json()));
    }
}
