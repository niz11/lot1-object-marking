import { fetchWrapper } from "../helpers/fetch-wrapper";

function create(data) {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
    };
    const url = `http://api.com/`;
    return fetch(
        url,
        requestOptions
    );
}
function update(id, data) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(data),
    };
    const url = `http://api.com/`;
    return fetchWrapper.put(url, requestOptions);
}
const webXrService = {
    create,
    update
};

export default webXrService;
