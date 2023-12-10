import axios from "axios";

export const createNewMinyan = async (data) => {
    return await (await axios.get(`https://localhost:7229/api/User`,data)).data;

}
export const createMinyan = async (data) => {
    return await (await axios.get(`https://localhost:7229/api/User`,data)).data;

}
export const resMinyan = async (data) => {
    return await (await axios.get(`https://localhost:7229/api/User`)).data;

}
export const getAllMinyans = async () => {
    return await axios.get(`https://localhost:7229/api/User`);

}
export const getByDate = async (data) => {
    return await axios.post(`https://localhost:7229/api/User`,data);

}
