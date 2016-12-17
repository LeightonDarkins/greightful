const expect = require('expect')
const request = require('supertest')

const { app } = require('./server')
const { greightfuls, populateGreightfuls, destroyGreightfuls } = require('./seed/seed')

const { Greightful } = require('./models/greightful')

beforeEach(populateGreightfuls)
afterEach(destroyGreightfuls)

describe('GET /greightful', () => {
  it('should get a greightful', (done) => {
    request(app)
      .get('/greightful')
      .expect(200)
      .expect((res) => {
        expect(res.body.greightfulContent).toEqual('this is a test')
        expect(res.body.date).toEqual('11/22/33')
        expect(res.body.likes).toEqual('20')
        expect(res.body.dislikes).toEqual('40')
      })
      .end(done)
  })
})

describe('POST /greightful', () => {
  it('should create a greightful', (done) => {
    let objectToSend = {
      greightfulContent: 'created by me'
    }

    request(app)
      .post('/greightful')
      .send(objectToSend)
      .expect(201)
      .expect((res) => {
        expect(res.body.greightfulContent).toEqual(objectToSend.greightfulContent)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Greightful.find({ greightfulContent: objectToSend.greightfulContent }).then((docs) => {
          expect(docs.length).toBe(1)
          expect(docs[0].greightfulContent).toEqual(objectToSend.greightfulContent)
          done()
        }).catch((error) => done(error))
      })
  })

  it('should return an error for empty greightfulContent', (done) => {
    request(app)
      .post('/greightful')
      .send({ greightfulContent: ''})
      .expect(400)
      .expect((res) => {
        expect(res.body.errors.greightfulContent.message).toEqual('Path `greightfulContent` is required.')
      })
      .end(done)
  })
})

describe('PUT /greightful', () => {
  it('should update a greightful', (done) => {
    request(app)
      .put('/greightful')
      .send({
        _id: greightfuls[0]._id,
        greightfulContent: 'a change',
        date: '11/22/33',
        likes: '10',
        dislikes: '400'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.greightfulContent).toEqual('a change')
        expect(res.body.date).toEqual('11/22/33')
        expect(res.body.likes).toEqual('10')
        expect(res.body.dislikes).toEqual('400')
      })
      .end(done)
  })
})
