const config = {
    api: 'https://5c6eb0534fa1c9001424240b.mockapi.io',
    options: {
        headers: { 'content-type': 'application/json' },
    },
};

export function getBooks() {
    return fetch(`${config.api}/books`, {
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
}


export function postBook(data) {
    return fetch(`${config.api}/books`, {
        method: 'post',
        body: data ? JSON.stringify(data) : null,
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
}

export function getBook(id) {
    return fetch(`${config.api}/books/${id}`, {
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
}

export function putBook(id, data) {
    return fetch(`${config.api}/books/${id}`, {
        method: 'put',
        body: data ? JSON.stringify(data) : null,
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
}

export function deleteBook(id) {
    return fetch(`${config.api}/books/${id}`, {
        method: 'delete',
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
}

function handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        throw Error(response.json() || 'error');
    }
}
