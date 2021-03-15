export type OneCallResponse = {
    lat: number;
    long: number;
    timezone: string;
    timezone_offset: number;
    current: {
        dt: number; // datetime
        sunrise: number; // datetime
        sunset: number; // datetime
        temp: number; // temperature (degrees)
        feels_like: number; // feels like (degrees)
        pressure: number; // air pressure (%)
        humidity: number; // air humidity (%)
        dew_point: number; // dew point
        uvi: number; // index for ultraviolet
        clouds: number; // ??
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[]
    },

    alerts: {
        sender_name: string;
        event: string;
        start: number;
        end: number;
        description: string;
    }[]
};
