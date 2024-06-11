import { describe, expect, test } from '@jest/globals';
import request from "supertest";
import path from 'path';
import { app } from '../index';

describe('Test api/getfiles', () => {
    test('Get CSV data', async () => {
       const url = "/api/getfiles/";
       const response = await request(app).get(url);

       expect(response.statusCode).toEqual(200);
    });
});

describe('Test api/filesave', () => {
    test('Save CSV file', async () => {
        const url = "/api/filesave";
        const file = path.resolve(__dirname, '../resources/testLoad.csv');
     
        const response = await request(app).post(url)
                                           .set('content-type', 'application/octet-stream')
                                           .attach('file', file)
                                           .expect(200);
       
       expect(response.statusCode).toEqual(200);
    });
});

describe('Test api/filedelete', () => {
    test('Save CSV file', async () => {
        const url = "/api/filedelete";
        
        const response = await request(app).post(url)
                                           .send({datafileid: '30'})
                                           .set('Accept', 'application/json')
                                           .expect('Content-Type', /json/)
                                           .expect(200);
       
       expect(response.statusCode).toEqual(200);
    });
});