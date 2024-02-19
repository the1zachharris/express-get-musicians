// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    
    
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



    
})