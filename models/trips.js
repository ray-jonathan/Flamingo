const db = require('./conn');

class Trip {
    constructor(id, trip_location, trip_date, lat, lon, trip_details, trip_photos, user_id) {
        this.id = id;
        this.trip_location = trip_location;
        this.trip_date = trip_date;
        this.lat = lat;
        this.lon = lon;
        this.trip_details = trip_details;
        this.trip_photos = trip_photos;
        this.user_id = user_id;
    }

    static getTripById(tripId) {
        return db.one(`
        SELECT * from trips
        WHERE id = ${tripId};
        `)
        .then(trip => {
            const tripInstance = new Trip(
                trip.id,
                trip.trip_location,
                trip.trip_date,
                trip.lat,
                trip.lon,
                trip.trip_details,
                trip.trip_photos,
                trip.user_id,
            )
            return tripInstance;
        })
        .catch(err => err)
    }

    static getAllTrips() {
        return db.any(`
        SELECT * from trips
        ORDER BY trip_date DESC;
        `)
    }

    static addNewTrip(trip_location, trip_date, lat, lon, trip_details, trip_photos, user_id) {
        return db.result(`
        INSERT INTO trips (trip_location, trip_date, lat, lon, trip_details, trip_photos, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [trip_location, trip_date, lat, lon, trip_details, trip_photos, user_id]
        )
    }

    // Should editTrip recieve an object as an argument instead?
    static editTrip(location, date, lat, lon, details, photos, tripId) {
        return db.result(`
        UPDATE trips
        SET trip_location = $1, trip_date = $2, lat = $3, lon = $4, trip_details = $5, trip_photos = $6
        WHERE id = ${tripId}
        `, [location, date, lat, lon, details, photos])
    }

    static deleteTrip(tripId) {
        return db.result(`
        DELETE from trips
        WHERE id = ${tripId};
        `)
    }
}

module.exports = Trip;