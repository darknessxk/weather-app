const parseGeocodeName =
    (name: string) => name
        .split(', ')
        .filter((_, i) => i > 0)
        .join(', ')
        .replace('State of', '');

export default parseGeocodeName;
