type Types = "deg" | "percentage" | "date" | "kmh";

const textFormat = (text: string | number, type: Types) => {
    switch (type) {
        case "deg":
            return `${text}º`
        case "percentage":
            return `${text}%`
        case "kmh":
            return `${text}km/h`;
        case "date":
            return text;
        default:
            break;
    }
}

export default textFormat;
