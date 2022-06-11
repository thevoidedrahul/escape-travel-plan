import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { MapLocation } from "../../model";
import { ApiService } from "../../shared/api.service";

@Component({
    selector: 'location-input',
    templateUrl: './location.input.component.html',
    styleUrls: ['./location.input.component.scss']
})

export class LocationInputComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() label: string;
    @Input() placeholder: string;
    @Input() selectedValue: MapLocation;
    @Input() disabled: boolean;
    @Output() location: EventEmitter<MapLocation>;
    @Output() processing: EventEmitter<boolean>;

    public locationSearch: string;
    public locationList: MapLocation[];
    private locationSearch$: Subscription;

    @ViewChild('locationInput') locationInput: ElementRef<HTMLInputElement>;

    constructor(private _apiService: ApiService) {
        this.label = "";
        this.placeholder = "";
        this.disabled = false;
        this.locationInput = null as unknown as ElementRef;
        this.location = new EventEmitter();
        this.processing = new EventEmitter();
        this.locationSearch$ = new Subscription();
        this.locationSearch = "";
        this.locationList = [];
        this.selectedValue = null as unknown as MapLocation;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { selectedValue } = changes;
        if (selectedValue?.currentValue != selectedValue?.previousValue) {
            this.setSelectedValue();
        }
    }

    ngAfterViewInit(): void {
        this.trackInputLocation();
    }

    ngOnDestroy(): void {
        this.locationSearch$?.unsubscribe();
    }

    setProcessingValue(value: boolean) {
        this.processing.emit(value);
    }

    setLocationValue(value: any) {
        this.location.emit(value);
    }

    setSelectedValue() {
        this.locationSearch = this.selectedValue.name ? `${this.selectedValue.name}, ${this.selectedValue.country?.name}` : "";
    }

    trackInputLocation() {
        fromEvent(this.locationInput?.nativeElement, 'keyup').pipe(
            map((event: any) => { return (event?.target?.value?.trim() ?? "") }),
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe((value: string) => {
            this.setProcessingValue(true);
            this.getLocationListByKeyword(value);
        });
    }

    getLocationListByKeyword(keyword: string): void {
        this._apiService.getLocationByKeyword(keyword)
            .subscribe((response) => {
                this.locationList = response?.locations ?? [];
            }, (error) => {
                console.log(error);
            });
    }

    setSelectedOption(value: MapLocation) {
        this.selectedValue = value;
        this.setSelectedValue();
        this.setLocationValue(value);
        this.setProcessingValue(false);
    }
}