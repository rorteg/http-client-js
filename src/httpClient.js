module.exports = class httpClient {
    constructor(fullResponse = true) {
        this.fullResponse = fullResponse;
        this.validResponseStatus = [200, 201, 203, 204];
        this.APIURL = ``;
        this.options = {
            method: 'GET',
            body: {}
        };
        this.body = {
            method: 'GET',
            path: '',
            payload: {}
        };
    }

    get(path) {
        this.options.method = 'GET';
        return this._request(path);
    }

    post(path, payload) {
        this.options.method = 'POST';
        return this._request(path, payload);
    }

    put(path, payload) {
        this.options.method = 'PUT';
        return this._request(path, payload);
    }

    patch(path, payload) {
        this.options.method = 'PATCH';
        return this._request(path, payload);
    }

    delete(path) {
        this.options.method = 'DELETE';
        return this._request(path);
    }

    _generateHash() {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    }

    _updateQueryStringParameter(uri, key, value) {
        var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = uri.indexOf('?') !== -1 ? '&' : '?';
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + '=' + value + '$2');
        } else {
            return uri + separator + key + '=' + value;
        }
    }

    _request(path, payload = null) {
        if (this.options.method == 'POST') {
            this.body.payload = payload;
            this.body.method = this.options.method;
            this.options.body = this.body;
        }

        this.options.body = payload;
        return this.fetch(`${this.APIURL}${path}`, this.options, path);
    }

    fetch(url, optionObj, JSONparsing = false) {
        if (!optionObj || optionObj.method === undefined) {
            optionObj.method = 'GET';
        }

        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open(optionObj.method, url, true);
            //req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            // if headers exist, we will set them
            if (optionObj.headers) {
                for (const key in optionObj.headers) {
                    req.setRequestHeader(key, optionObj.headers[key]);
                }
            }

            // when we got back a response, use it for Promise API
            req.onload = () => {
                if (
                    req.readyState == XMLHttpRequest.DONE &&
                    this.validResponseStatus.indexOf(req.status) !== -1
                ) {
                    if (!this.fullResponse) {
                        try {
                            resolve(JSON.parse(req.response));
                        } catch (e) {
                            resolve(req.response);
                        }
                    }
                    resolve(req);
                } else {
                    if (this.fullResponse) {
                        reject(req);
                    } else {
                        reject(req.response);
                    }
                }
            };

            if (JSONparsing) {
                req.responseType = 'json';
            }

            // finally send the request body, this will be ignored if the method is 'GET'
            req.send(JSON.stringify(optionObj.body));
        });
    }
};
