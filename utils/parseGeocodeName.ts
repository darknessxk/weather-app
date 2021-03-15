const parseGeocodeName = (name: string) => (name.split(', ').filter((_, i) => i > 0)).join(', ');

export default parseGeocodeName;
