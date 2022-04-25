import app from '../index.js';
import {listDataBase, schedule, Wrongschedule} from "./mocks.js"
import request from 'supertest';

test("Scheduling with valid body", async () => {
    const response = await request(app).post("/schedule").send(schedule);

    expect(response.body).toEqual(schedule);
});

test('Scheduling with invalid body', async () => {
    const response = await request(app).post("/schedule").send(wrongUserData);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty('message');
  });

test("Schedule Query", async () => {
    const response = await request(app).get("/schedule");

    expect(response.body).toEqual(listDataBase);
} )