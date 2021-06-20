import { useEffect, useState } from "react";
import handleResponse from "./api-helper";

// eslint-disable-next-line no-unused-vars
function useApi({ url, requestOptions }) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, requestOptions)
            .then(handleResponse)
            .then((data) => {
                setResponse(data);
                setLoading(false);
            })
            .catch((err) => {
                setHasError(true);
                setLoading(false);
            });
    }, [url]);
    return [response, loading, hasError];
}

export default useApi;
