import { useState, useEffect } from "react";

import { arePointsNear } from "./Utils";
import {
    UNABLE_TO_FETCH_COORDINATES, GEOLOCATION_NOT_SUPPORTED,
    REGISTRATION_AREA_COORDINATES, SUCCESS, ERROR
} from "./constants";

import "./GeolocateRegistration.css";

const GeolocateRegistration = () => {

    const [alert, setAlert] = useState(null);
    const [km, setKm] = useState(10);

    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        accessGeolocation();
    }, []);


    const accessGeolocation = () => {
        if ("geolocation" in navigator) {
            // Geolocation is available
            navigator.geolocation.getCurrentPosition((position) => {
                // Retrieve latitude and longitude
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Do something with latitude and longitude
                console.log("REGISTRATION_AREA_COORDINATES: ", REGISTRATION_AREA_COORDINATES.lat, REGISTRATION_AREA_COORDINATES.lng);
                console.log("Current Coordinates: ", latitude, longitude);

                return isCoordinatesWithinReach({
                    lat: latitude, lng: longitude
                });

            }, function (error) {
                // Handle error
                console.error("Error getting geolocation: ", error.message);
                setAlert({ message: UNABLE_TO_FETCH_COORDINATES, type: ERROR });
            });
        } else {
            // Geolocation is not available
            console.error(GEOLOCATION_NOT_SUPPORTED);
            setAlert({ message: GEOLOCATION_NOT_SUPPORTED, type: ERROR });
        }
    }

    const isCoordinatesWithinReach = (currentCoordinates) => {
        try {
            const isWithinReach = arePointsNear(currentCoordinates, km);

            if (isWithinReach) {
                return setAlert({ message: `The coordinates ${currentCoordinates.lat}, ${currentCoordinates.lng} is within reach. (Navigate to registration page)`, type: SUCCESS });
            }
            return setAlert({ message: `The coordinates ${currentCoordinates.lat}, ${currentCoordinates.lng} is out of bounds`, type: ERROR });
        }
        catch (e) {
            setAlert({ message: UNABLE_TO_FETCH_COORDINATES, type: ERROR });
        }
    }

    return (
        <>
            {/*
            For manual entry of coordinates
            <h2> Enter Coordinates:</h2>

            <input type="text" onChange={(e) => setLatitude(e.target.value)} placeholder="Enter latitude" />
            <input type="text" onChange={(e) => setLongitude(e.target.value)} placeholder="Enter longitude" /> 
            */}

            <h2> Enter KM range:</h2>
            <input type="text" onChange={(e) => setKm(e.target.value)} value={km} placeholder="Enter KM" />

            <h1> Is coordinates within reach?</h1>
            <button onClick={() => accessGeolocation()} > Check </button>
            {alert && <h2 className={alert.type}>{alert.message}</h2>}
        </>
    )
}

export default GeolocateRegistration;