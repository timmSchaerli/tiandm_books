export function getBookThumbnail(isbn) {
    return new Promise(async (resolve) => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn, {
            options: {
                headers: {'content-type': 'application/json'},
            },
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        try {
                            resolve(json.items[0].volumeInfo.imageLinks.thumbnail)
                        } catch (e) {
                            resolve("/bookNoImage.jpg")
                        }
                    })
                }
            })
            .then((response) => response)
            .catch((e) => {
                console.log(e)
            });
    })

}
