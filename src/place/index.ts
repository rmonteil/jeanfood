import fetch from "node-fetch";
import params from "../config/parameters";
import { encodeData } from "../util";

export default class Place {

    public async getCoordinates(address: string) {
        const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?" + encodeData({
            address,
            key: params.googlemaps.geocoding.apikey,
        }));
        const body = await response.json();
        if (body.status === "OK") {
            return {
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
            };
        }

        throw new Error("Message received:" + JSON.stringify(body));
    }

    public async getRestaurants(coordinates: {lat: number, lng: number}) {
        const response = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + encodeData({
            key: params.googlemaps.nearby.apikey,
            location: coordinates.lat + "," + coordinates.lng,
            radius: "1000",
            type: "restaurant",
        }));
        const body = await response.json();

        if (body.status === "OK") {
            const restaurants = body.results.filter((restaurant: {[key: string]: any}) => {
                if (restaurant.hasOwnProperty("opening_hours")
                    && restaurant.opening_hours.open_now === true
                    && restaurant.rating >= 4) {
                    return true;
                }
                return false;
            })
            .map((restaurant: {[key: string]: any}) => {
                return {
                    address: restaurant.vicinity,
                    name: restaurant.name,
                    rating: restaurant.rating,
                };
            });

            return restaurants;
        }

        throw new Error("Message received:" + JSON.stringify(body));
    }
}
