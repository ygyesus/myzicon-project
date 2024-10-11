const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = 'mongodb://localhost:27017/myzicon';
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  incomeSoFar: {type: Number, default: 0},
  incomeExpected: {type: Number, default: 0},
  expenseSoFar: {type: Number, default: 0},
  expenseExpected: {type: Number, default: 0},
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  userIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  materialProcurement: [{
    type: String,
    amount: Number,
    date: Date,
  }]
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Project', projectSchema)