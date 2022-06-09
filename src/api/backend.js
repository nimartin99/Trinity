import {
    getRequest,
} from "./request";

const getWeather = async (lat, lon, part) => getRequest(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=fb7fe51e9358def623bced688be6a448`);
const getCatFact = async () => getRequest('https://catfact.ninja/fact');

export {
    getWeather,
    getCatFact,
};