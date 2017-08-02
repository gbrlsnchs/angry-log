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
        this.updatePublicApi();
    }

    public set condition(condition: boolean) {
        this.logCondition = condition;
        this.updatePublicApi();
    }

    public set title(title: AngryLogTitle) {
        this.logTitle = typeof title === "object" ? title.constructor.name : title;
        this.updatePublicApi();
    }

    public set URL(URL: string) {
        this.remoteURL = URL;
        this.updatePublicApi();
    }

    private resolveFunc(attrName: string): Function {
        let attr: Function = window.console[attrName];
        let isFunction: boolean = typeof attr === "function";

        if (attr && this.logCondition) {
            if (isFunction) {
                if (this.logTitle) {
                    return attr.bind(window.console, `%c ${this.logTitle} `, "border: solid 1px; border-radius: 25px");
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

    private updatePublicApi(): void {
        this.assert = this.resolveFunc('assert');
        this.clear = this.resolveFunc('clear');
        this.count = this.resolveFunc('count');
        this.debug = this.resolveFunc('debug');
        this.dir = this.resolveFunc('dir');
        this.dirxml = this.resolveFunc('dirxml');
        this.error = this.resolveFunc('error');
        this.exception = this.resolveFunc('exception');
        this.group = this.resolveFunc('group');
        this.groupCollapsed = this.resolveFunc('groupCollapsed');
        this.groupEnd = this.resolveFunc('groupEnd');
        this.info = this.resolveFunc('info');
        this.log = this.resolveFunc('log');
        this.msIsIndependentlyComposed = this.resolveFunc('msIsIndependentlyComposed');
        this.profile = this.resolveFunc('profile');
        this.profileEnd = this.resolveFunc('profileEnd');
        this.select = this.resolveFunc('select');
        this.table = this.resolveFunc('table');
        this.time = this.resolveFunc('time');
        this.timeEnd = this.resolveFunc('timeEnd');
        this.trace = this.resolveFunc('trace');
        this.warn = this.resolveFunc('warn');
    }
}
