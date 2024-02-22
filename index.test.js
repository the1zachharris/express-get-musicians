// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const syncSeed = require('./seed')


describe('./musicians endpoint', () => {
    // Write your tests here
    beforeAll(async () => {
        await syncSeed();
    });
    
    test('testing musician endpoint', async () => {
        const res = await request(app).get('/musicians');
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData[0]).toEqual(
            expect.objectContaining({
                name: 'Mick Jagger',
                instrument: 'Voice'
            })
        );
    });

    test('testing GET musicians/:id endpoint', async () => {
        const res = await request(app).get('/musicians/' + 1);
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData).toEqual(
            expect.objectContaining({
                name: 'Mick Jagger',
                instrument: 'Voice'
            })
        );
    });

    test('testing POST musicians endpoint', async () => {
        const res = await request(app)
            .post('/musicians')
            .send({
                name: 'test',
                instrument: 'test'
            });
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData).toEqual(
            expect.objectContaining({
                name: 'test',
                instrument: 'test'
            })
        );
    });
    test('testing failed POST musicians endpoint returns array of errors', async () => {
        const res = await request(app)
            .post('/musicians')
            .send({
                name: 'test'
            });
        //expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toBe(true);
    });
    test('testing put musicians endpoint', async () => {
        const res = await request(app)
            .put('/musicians/' + 1)
            .send({
                name: 'test1',
                instrument: 'test'
            });
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData).toEqual(
            expect.objectContaining({
                name: 'test1',
                instrument: 'test'
            })
        );
    });
    test('testing DELETE musicians/:id endpoint', async () => {
        const res = await request(app).delete('/musicians/1');
        const restaurants = await Musician.findAll();
        expect(res.statusCode).toBe(200);
        expect(restaurants[0].id).not.toEqual(1);
    });
    
})