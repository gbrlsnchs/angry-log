import { isDevMode } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { AngryLogTitle } from "./angry-log.types";

export class AngryLogger {
    public assert: Function;
    public clear: Function;
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
    protected http: Http;
    private logCondition: boolean;
    private logTitle: string;
    private remoteURL: string;

    constructor(http: Http) {
        this.logCondition = isDevMode();
        this.http = http;
        this.wrapConsole();
    }

    public set condition(condition: boolean) {
        this.logCondition = condition;
        this.wrapConsole();
    }

    public set title(title: AngryLogTitle) {
        this.logTitle = typeof title === "object" ? title.constructor.name : title;
        this.wrapConsole();
    }

    public set URL(URL: string) {
        this.remoteURL = URL;
        this.wrapConsole();
    }

    private resolveFunc(attrName: string): Function {
        let attr: Function = window.console[attrName];
        let isFunction: boolean = typeof attr === "function";

        if (attr && this.logCondition) {
            if (isFunction) {
                if (this.logTitle) {
                    return attr.bind(window.console, ` %c ${this.logTitle} `, "border: solid 1px; border-radius: 25px");
                }

                return attr.bind(window.console);
            }

            return attr;
        }

        if (this.remoteURL && attrName === "error") {
            return this.remoteLog;
        }

        return (): void => {};
    }

    private remoteLog(message: string): Observable<Response> {
        return this.http.post(this.remoteURL, { message })
            .map((response: Response): Response => response.json())
            .catch((response: Response): ErrorObservable<Response> => Observable.throw(response.json()));
    }

    private wrapConsole(): void {
        for (let key of Object.keys(window.console)) {
            this[key] = this.resolveFunc(key);
        }
    }
}
