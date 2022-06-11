import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";

@Injectable({ providedIn: 'root' })

export class ApiService {
    constructor(private httpService: HttpService) { }

    getLocationByKeyword(search: string) {
        return this.httpService.get(`api/search/locations?term=${search}&index=cities`);
    }
}