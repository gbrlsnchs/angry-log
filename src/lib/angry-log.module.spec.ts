import "zone.js";
import { TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import "jasmine";
import { AngryLogService } from "./angry-log.service";

describe("AngryLogModule", (): void => {
    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ]
        });
    });

    it("should create a logger object", (done: DoneFn): void => {
        let ngls: AngryLogService = TestBed.get(AngryLogService);

        expect(ngls).toBeDefined();
        done();
    });
});
