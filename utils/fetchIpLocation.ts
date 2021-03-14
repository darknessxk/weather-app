import axios from "axios";

const fetchIpLocation = async (ip: string) => await axios.request({
    url: `http://ip-api.com/json/${ip}`,
    method: 'GET'
});

export default fetchIpLocation;
