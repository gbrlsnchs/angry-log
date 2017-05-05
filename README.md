# Angry Log

![Yes, I'm angry!](https://i.imgur.com/qeoFdfd.png)
> "Stop cutting logs off! At least for development environments..."

## Benefits

* Shows the correct line
* Logs only under a certain condition
* Remote logging in production
* Stupid simple and elegant

## Usage

The idea behind it is pretty simple:
If [Angular]'s `isDevMode()` returns `true`, 
`window.console.log` and variants will work as usual. Otherwise, Angry Log will 
look for a URL for remote logging (only for `window.console.error`).

![](https://i.imgur.com/mNoVwlc.png)

Simply import the module:
```typescript
/* app.module.ts */
// import ...
import { AngryLogger, AngryLogModule } from "angry-log";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        AngryLogModule
    ]
})
export class AppModule {}
```

Then:
```typescript
/* app.component.ts */
// import ...
import { AngryLogService } from "angry-log";

@Component({
    selector: "app"
})
export class AppComponent {
    constructor(ngls: AngryLogService) {
        // this will only print to the console
        // if "isDevMode()" is true
        ngls.title = "Global Name";
        ngls.log("AppComponent");

        // since v0.2.0, it's possible to
        // instantiate a logger from the service
        let loggerFoo: AngryLogger = ngls.instantiateLogger({ title: 'From Foo' });
        loggerFoo.log("Hello World");

        // prints the class's name
        let loggerBar: AngryLogger = ngls.instantiateLogger({ title: this });
        loggerBar.debug("Checking atmosphere...");

        // instances are configured passing a structure as parameter,
        // but passing nothing is okay too
        let loggerVegan: AngryLogger = ngls.instantiateLogger();
        loggerVegan.warn("Save the Earth, go vegan!");
    }
}
```

## Settings

They're the same for both the service and the log instances:
* condition: `boolean`, default is `isDevMode()`
* title: `string`, default is `undefined`, sets a title to show in the logs
* URL: `string`, default is `undefined`, is the URL for remote debugging

[Angular]: https://angular.io
