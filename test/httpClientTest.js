/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */
/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const httpClient = require('../src/httpClient');

// Enables the "should" assertion style in chai
chai.should();

describe('httpClient: ', () => {
    test('GET method test', async () => {
        const API = 'https://jsonplaceholder.typicode.com/todos/1';
        const client = new httpClient(false);
        client.options.headers = {
            'Content-type': 'application/json; charset=utf-8'
        };
        const promise = await client.get(API);
        expect(promise.id).toBe(1);
    });

    test('POST method test', async () => {
        const API = 'https://jsonplaceholder.typicode.com/posts';
        const payload = {
            userId: 1,
            title: 'test post',
            completed: false
        };

        const client = new httpClient(false);
        client.options.headers = {
            'Content-type': 'application/json; charset=utf-8'
        };

        const promise = await client.post(API, payload);
        expect(promise.title).toBe(`test post`);
    });

    test('PUT method test', async () => {
        const API = 'https://jsonplaceholder.typicode.com/posts/1';
        const client = new httpClient(false);
        client.options.headers = {
            'Content-type': 'application/json; charset=utf-8'
        };

        const payload = {
            title: 'test post updated'
        };

        const promise = await client.put(API, payload);
        expect(promise.title).toBe(`test post updated`);
    });

    test('PATCH method test', async () => {
        const API = 'https://jsonplaceholder.typicode.com/posts/1';
        const client = new httpClient(false);
        client.options.headers = {
            'Content-type': 'application/json; charset=utf-8'
        };

        const payload = {
            title: 'test post patch'
        };

        const promise = await client.patch(API, payload);
        expect(promise.title).toBe(`test post patch`);
    });

    test('DELETE method test', async () => {
        const API = 'https://jsonplaceholder.typicode.com/posts/1';
        const client = new httpClient(true);

        const promise = await client.delete(API);
        expect(promise.status).toEqual(200);
    });
});
