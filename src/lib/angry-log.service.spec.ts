import "jasmine";
import { inject, TestBed } from "@angular/core/testing";
import { HttpModule, Response, ResponseOptions, XHRBackend } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { AngryLogService } from "./angry-log.service";

describe("AngryLogService", (): void => {
    const TEST_URL = "/test";

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                AngryLogService
            ]
        });
    });

    it("should set URL properly", inject([AngryLogService], (ngls: AngryLogService): void => {
        ngls.URL = TEST_URL;
        expect(ngls.URL).toEqual(TEST_URL);
    }));

    it("should successfully POST the error log", inject([AngryLogService, XHRBackend], (ngls: AngryLogService, mockBackend: MockBackend): void => {
        const ERR_MSG: string = "ERROR";
        const mockResponse: { data: string } = {
            data: ERR_MSG
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });

        ngls.condition = false;
        ngls.error(ERR_MSG)
            .subscribe((response: { data: string }) => {
                const MSG: string = response.data;

                expect(MSG).toBeDefined();
                expect(MSG).toEqual(ERR_MSG);
            });
    }));
});
