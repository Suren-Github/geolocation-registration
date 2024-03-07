import { REGISTRATION_AREA_COORDINATES } from "./constants";

export const arePointsNear = (centerPoint, km = 10) => { // km defaults to 10
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - REGISTRATION_AREA_COORDINATES.lng) * kx;
    var dy = Math.abs(centerPoint.lat - REGISTRATION_AREA_COORDINATES.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= parseInt(km);
}