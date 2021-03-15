import * as fns from 'date-fns'

type Types = "deg" | "percentage" | "kmh" | "hours" | "meters" | "meters/s";

const textFormat = (text: string | number, type: Types) => {
    switch (type) {
        case "deg":
            return `${text}º`
        case "percentage":
            return `${text}%`
        case "kmh":
            return `${text}km/h`;
        case "meters":
            return `${text}m`;
        case "meters/s":
            return `${text}m/s`;
        case "hours":
            const fromUnix = fns.fromUnixTime(Number.parseInt(text as string));
            return fns.format(fromUnix, "HH:mm'h'");
        default:
            break;
    }
}

export default textFormat;
