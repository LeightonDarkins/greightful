const { ObjectID } = require('mongodb')

const { Greightful } = require('../models/greightful')

const greightfulId = new ObjectID();

const greightfuls = [{
  _id: greightfulId,
  greightfulContent: 'this is a test',
  date: '11/22/33',
  likes: '20',
  dislikes: '40'
}]

const populateGreightfuls = (done) => {
  Greightful.remove({}).then(() => {
    return Greightful.insertMany(greightfuls)
  }).then(() => done())
}

const destroyGreightfuls = (done) => {
  Greightful.remove({}).then(() => {
    done()
  })
}

module.exports = {
  populateGreightfuls,
  greightfuls,
  destroyGreightfuls
}
