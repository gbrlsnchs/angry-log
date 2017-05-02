# Angry Log

![Yes, I'm angry!](https://t5.rbxcdn.com/8e00ad493b6375b36a1260d2127dad09)
> "Stop cutting logs off! At least for development environments..."

## Usage

The idea behind it is pretty simple:
If [Angular]'s `isDevMode()` returns `true`, 
`window.console.log` and variants will work as usual. Otherwise, Angry Log will 
look for a URL for remote logging (only for `window.console.error`).

```typescript
// other imports above
import { AngryLogModule, AngryLogService } from "angry-log";

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
    ],
    providers: [
        AngryLogService
    ]
})
export class AppModule {}

@Component({
    selector: "app"
})
export class AppComponent {
    constructor(ngls: AngryLogService) {
        // this will only print to the console
        // if "isDevMode()" is true
        ngls.log("AppComponent");
    }
}
```

## Settings
* condition: `boolean`, default is `isDevMode()`
* URL: `string`, default is `undefined`, is the URL for remote debugging

[Angular]: https://angular.io
