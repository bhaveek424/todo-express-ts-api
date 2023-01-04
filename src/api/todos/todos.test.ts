import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) {}
});

describe('GET /api/v1/todos', () => {
  it('responds with an array of todos', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';
describe('POST /api/v1/todos', () => {
  it('responds with an error if Todo is invalid', async () =>
    request(app)
      .post('/api/v1/todos')
      .send({
        content: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/todos')
      .send({
        content: 'Learn Typescript',
        done: false,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('done');
      }));
});

describe('GET /api/v1/todos/:id', () => {
  it('responds with a single todo', async () =>
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('done');
      }));

  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/todos/asdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
