import useApi from "./useApi";

function put(url, body) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions);
}
function get(url, requestOptions) {
    return useApi({ url, requestOptions });
}
function getById(url, requestOptions) {
    return fetch(url, requestOptions);
}
// eslint-disable-next-line import/prefer-default-export
export const fetchWrapper = {
    get,
    getById,
    put,
};
