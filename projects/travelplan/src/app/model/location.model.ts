export type MapLocation = {
    name: string;
    type: string;
    country: Country;
    location: LatLong;
}

export type Country = {
    code: string;
    id: string;
    name: string;
    slug: string;
}

export type LatLong = {
    lat: number;
    lon: number;
}