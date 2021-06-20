export default function handleResponse(response) {
    if (response.status === 401) {
        return Promise.reject(new Error("unauthorized"));
    }

    return Promise.resolve(response).then((resp) => resp.json());
}
