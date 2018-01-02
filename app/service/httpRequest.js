const fetchGet = (url) => {
    // const res = await fetch(url);
    // const data = await res.json();
    // return data;
    return fetch(url, {
        method: 'GET'
    }).then(response => response.json()).catch(err => {
        alert(err);
    })
}

const fetchPost = (url, params = {}) => {
    // const res = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(params)
    // });
    // const data = await res.json();
    // return data;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    }).then(response => response.json()).catch(err => {
        alert(err);
    })
}

export { fetchGet, fetchPost }
