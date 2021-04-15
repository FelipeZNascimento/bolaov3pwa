export function http(request: Request) {
    return fetch(request)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                // let error;
                // if (response.status === 409) {
                //     error = new Error('Conflito: esse item está sendo usado em outro lugar e não pode ser alterado.');
                // }
                // error.status = response.status;
                throw response;
            }
        })
        .then((data) => {
            return data;
        })
        .catch(function (error) {
            throw error;
        });
}
