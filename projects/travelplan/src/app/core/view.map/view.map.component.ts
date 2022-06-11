import { Component, Input, OnInit } from "@angular/core";
import { } from 'googlemaps';
import { MapLocation } from "../../model";

@Component({
    selector: 'view-map',
    templateUrl: 'view.map.component.html',
    styleUrls: ['./view.map.component.scss']
})

export class ViewMapComponent implements OnInit {
    @Input() departure: MapLocation;
    @Input() destinations: MapLocation[];

    mapLoaded: boolean;
    map: google.maps.Map;
    center: google.maps.LatLngLiteral;

    options: google.maps.MapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: true,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        zoom: 12
    }

    ds: google.maps.DirectionsService;
    dr: google.maps.DirectionsRenderer;

    constructor() {
        this.departure = null as unknown as MapLocation;
        this.destinations = [];
        this.mapLoaded = false;
        this.map = null as unknown as google.maps.Map;
        this.center = null as unknown as google.maps.LatLngLiteral;
        this.map = null as unknown as google.maps.Map;
        this.ds = null as unknown as google.maps.DirectionsService;
        this.dr = null as unknown as google.maps.DirectionsRenderer;

    }

    ngOnInit(): void {
        this.mapLoaded = false;
        this.setMapInfo();
    }

    setMapInfo() {
        if (this.departure && this.destinations?.length > 0) {
            var mapOptions = {
                center: new google.maps.LatLng(this.departure.location.lat, this.departure.location.lon),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            let map = new google.maps.Map(document.getElementById("map-canvas") as any, mapOptions);
            let infoWindow = new google.maps.InfoWindow();

            let latLongList = new Array();
            let sourceLatLng = new google.maps.LatLng(this.departure.location.lat, this.departure.location.lon);
            latLongList.push(sourceLatLng);

            let latLngBounds = new google.maps.LatLngBounds();

            let listOfPlace = [...[this.departure], ...(this.destinations.reverse())]

            for (let index = 0; index < listOfPlace.length; index++) {
                let data = listOfPlace[index];

                let latLong = new google.maps.LatLng(data.location.lat, data.location.lon);

                latLongList.push(latLong);

                let marker = new google.maps.Marker({
                    position: latLong,
                    map: map,
                    title: `${data.name}, ${data.country?.name}`
                }) as any;

                latLngBounds.extend(marker.position);
                ((marker, data) => {
                    google.maps.event.addListener(marker, "click", function (e) {
                        infoWindow.setContent(`${data.name}, ${data.country?.name}`);
                        infoWindow.open(map, marker);
                    });
                })(marker, data);
            }


            map.setCenter(latLngBounds.getCenter());
            map.fitBounds(latLngBounds);

            var service = new google.maps.DirectionsService();

            //Loop and Draw Path Route between the Points on MAP
            for (let index = 0; index < latLongList.length; index++) {
                if ((index + 1) < latLongList.length) {
                    var src = latLongList[index];
                    var des = latLongList[index + 1];

                    service.route({
                        origin: src,
                        destination: des,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {

                            //Initialize the Path Array
                            var path = new google.maps.MVCArray() as any;
                            //Set the Path Stroke Color
                            var poly = new google.maps.Polyline({
                                map: map,
                                strokeColor: '#4986E7'
                            });
                            poly.setPath(path);
                            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                path.push(result.routes[0].overview_path[i]);
                            }
                        }
                    });
                }
            }

            this.mapLoaded = true;
        }
    }
}