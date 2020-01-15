import {Coordinate} from "@gobygame/models";

// Computes the bearing in degrees from the point A(x,y) to
// the point B(x,y). Note that A and B are given in terms of
// screen coordinates. shorturl.at/nowLR
export const computeBearing = (a: Coordinate, b: Coordinate): number => {
    const TWOPI = 6.2831853071795865;
    const RAD2DEG = 57.2957795130823209;
    // if (a.x = b.x and a.y = b.y) throw an error
    let theta = Math.atan2(b.x - a.x, a.y - b.y);
    if (theta < 0.0) {
        theta += TWOPI;
    }
    return RAD2DEG * theta;
};
