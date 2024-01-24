const request = require('supertest');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const app = require('../app');
// sebelum test, kita butuh data user
let token;

beforeEach(async () => {
  await queryInterface.bulkInsert('Movies', [
    {
      title: 'Pengabdi Setan 2',
      description: 'desc',
      rating: 7,
      image: 'public/images/image-1706004424779-8-7JnDb8Dfd2WXePk.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Pengabdi Setan 2 Combined',
      description: 'desc',
      rating: 7,
      image: 'public/images/image-1706004424779-8-7JnDb8Dfd2WXePk.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterEach(async () => {
  await queryInterface.bulkDelete('Movies', {}, { truncate: true, restartIdentity: true });
});

describe('POST Movie', () => {
  it('success', (done) => {
    request(app)
      .post('/movies')
      .field({
        title: 'Pengabdi Setan 2',
        description: 'desc',
        rating: 7,
        image: 'public/images/image-1706004424779-8-7JnDb8Dfd2WXePk.png',
      })
      .attach(
        'image',
        'C:\\projects\\movies-api\\public\\images\\image-1706003399950-8-7JnDb8Dfd2WXePk.png',
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body.meta.success).toBe(true);
          expect(res.body.meta.code).toBe(201);
          expect(res.body.meta.message).toBe('Movie Successfully Created');
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('title');
          expect(res.body.data).toHaveProperty('description');
          expect(res.body.data).toHaveProperty('rating');
          expect(res.body.data).toHaveProperty('image');
          done();
        }
      });
  });
  it('Required field violation', (done) => {
    request(app)
      .post('/movies')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(400);
          expect(res.body.meta.success).toBe(false);
          expect(res.body.meta.message).toBe('Data Not Complete');
          done();
        }
      });
  });
});

describe('GET Movie', () => {
  it('success', (done) => {
    request(app)
      .get('/movies')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body.meta.success).toBe(true);
          expect(res.body.meta.message).toBe('Successfully Getting All Movies');
          expect(Array.isArray(res.body.data)).toBe(true);
          done();
        }
      });
  });
});

describe('GET Movie By Id', () => {
  it('Success', (done) => {
    request(app)
      .get('/movies/1')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body.meta.success).toBe(true);
          expect(res.body.meta.message).toBe('Successfully Getting Data Movie');
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('title');
          expect(res.body.data).toHaveProperty('description');
          expect(res.body.data).toHaveProperty('rating');
          expect(res.body.data).toHaveProperty('image');
          done();
        }
      });
  });

  it('Movie Not Found', (done) => {
    request(app)
      .get('/movies/10')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body.meta.success).toBe(false);
          expect(res.body.meta.message).toBe('Data Not Found');
          expect(res.body.data.includes('Movie Data Not Found')).toBe(true);
          done();
        }
      });
  });
});

describe('Delete Movie By Id', () => {
  it('Success', (done) => {
    request(app)
      .delete('/movies/1')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body.meta.success).toBe(true);
          expect(res.body.meta.message).toBe('Movie Successfully Deleted');
          done();
        }
      });
  });

  it('Movie Not Found', (done) => {
    request(app)
      .delete('/movies/10')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body.meta.success).toBe(false);
          expect(res.body.meta.message).toBe('Data Not Found');
          expect(res.body.data.includes('Movie Data Not Found')).toBe(true);
          done();
        }
      });
  });
});

describe('UPDATE Movie', () => {
  it('Success', (done) => {
    request(app)
      .patch('/movies/1')
      .field({
        title: 'Pengabdi Setan 2 Updated',
        // description: 'desc',
        rating: 7,
        image: 'public/images/image-1706004424779-8-7JnDb8Dfd2WXePk.png',
      })
      //   .attach(
      //     'image',
      //     'C:\\projects\\movies-api\\public\\images\\image-1706003399950-8-7JnDb8Dfd2WXePk.png',
      //   )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body.meta.success).toBe(true);
          expect(res.body.meta.message).toBe('Movie Successfully Updated');
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data).toHaveProperty('title');
          expect(res.body.data).toHaveProperty('description');
          expect(res.body.data).toHaveProperty('rating');
          expect(res.body.data).toHaveProperty('image');
          done();
        }
      });
  });

  it('Movie Not Found', (done) => {
    request(app)
      .patch('/movies/4')
      .field({
        title: 'Pengabdi Setan 2 Updated',
        description: 'desc',
        rating: 7,
        image: 'public/images/image-1706004424779-8-7JnDb8Dfd2WXePk.png',
      })
      .attach(
        'image',
        'C:\\projects\\movies-api\\public\\images\\image-1706003399950-8-7JnDb8Dfd2WXePk.png',
      )
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body.meta.success).toBe(false);
          expect(res.body.meta.message).toBe('Data Not Found');
          expect(res.body.data.includes('Movie Data Not Found')).toBe(true);
          done();
        }
      });
  });
});
