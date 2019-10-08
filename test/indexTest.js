/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-statements */
/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const httpClientIndex = require('../src/index');
const httpClientInstance = require('../src/httpClient');

// Enables the "should" assertion style in chai
chai.should();

test('HttpClient instance test', async () => {
    const client = new httpClientIndex();

    expect(client).toBeInstanceOf(httpClientInstance);
});
