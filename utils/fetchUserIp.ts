import axios from "axios";

const fetchUserIp = async () => await axios.request({
    url: 'https://api.my-ip.io/ip.json',
    method: 'GET'
});

export default fetchUserIp;
