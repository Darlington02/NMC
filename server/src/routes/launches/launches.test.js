const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Test Launch API', () => {
    beforeAll(async() => {
        await mongoConnect()
    })

    describe('Test Get /launches', () => {
        test('It should respond with 200 success', async() => {
            const response = await request(app).get('/launches').expect(200)
        })
    })
    
    describe('Test Post /launch', () => {
        const completeLaunchData = {
            mission: 'USS Entreprise',
            rocket: 'GJKJ432',
            target: 'Kepler-62 f',
            launchDate: 'January 24 2023'
        }
    
        const launchDataWithoutDate = {
            mission: 'USS Entreprise',
            rocket: 'GJKJ432',
            target: 'Kepler-62 f',
        }
    
        const launchDataWithInvalidDate  = {
            mission: 'USS Entreprise',
            rocket: 'GJKJ432',
            target: 'Kepler-62 f',
            launchDate: 'invalid'
        }
    
        test('It should respond with 201 created', async() => {
            const response = await request(app).post('/launches').send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate)
    
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
        test('It should catch missing required properties', async() => {
            const response = await request(app).post('/launches').send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            });
        })
    
        test('It should return invalid date error', async() => {
            const response = await request(app).post('/launches').send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Invalid Date',
            });
        })
    })
})