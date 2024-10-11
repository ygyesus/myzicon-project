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

const taskSchema = new mongoose.Schema({

    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    name: String,
    description: String,
    userIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    incomeExpected: Number,
    expenseExpected: Number

})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskSchema)