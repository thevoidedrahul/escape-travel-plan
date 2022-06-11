import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MapLocation } from '../../model';

@Component({
  selector: 'travel-route',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})

export class TravelComponent {
  public departure: MapLocation;
  public addMoreDesignationInProcess: boolean;
  public destinations: MapLocation[];
  public showSubmitButton: boolean;
  public formSubmitted: boolean;

  @ViewChild('viewMapCard') viewMapCard: ElementRef<HTMLDivElement>;

  constructor(title: Title) {
    title.setTitle("Travel | Escape");
    this.departure = null as unknown as MapLocation;
    this.addMoreDesignationInProcess = false;
    this.destinations = [];
    this.showSubmitButton = false;
    this.formSubmitted = false;
    this.viewMapCard = null as unknown as ElementRef;
  }

  trackByName = (index: number, value: MapLocation) => {
    return `${value.name}${value.country?.id}`;
  }

  searchDepartureIsInProcess(value: boolean) {
    if (value) {
      this.destinations = [];
      this.showSubmitButton = false;
    }
  }

  setDepartureValue(value: MapLocation) {
    this.departure = value;
    this.destinations = [];
    this.showSubmitButton = false;
    this.formSubmitted = false;
    this.addMoreCityInDestination();
  }

  setDestinationValue(index: number, value: MapLocation) {
    this.destinations[index] = value;
    this.showSubmitButton = true;
  }

  addMoreCityInDestination() {
    if (!(this.destinations?.length > 0)) {
      this.destinations = [];
    }
    this.destinations.push({} as unknown as MapLocation);
    this.showSubmitButton = false;
    this.formSubmitted = false;
  }

  scrollInView() {
    setTimeout(() => {
      if (this.viewMapCard?.nativeElement) {
        this.viewMapCard.nativeElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
      }
    }, 300);
  }

  completedTrip() {
    this.formSubmitted = true;
    this.scrollInView();
  }
}
