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

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    role: String,
    employmentPeriods: [
        {
            projectID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project'
            },
            startDate: Date,
            endDate: Date,
            expenseSoFar: Number,
            expenseExpected: Number,
            monthlyPayment: Number
        }
    ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('User', userSchema)


