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

  const materialUsageSchema = new mongoose.Schema({
    materialID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    },
    quantity: Number,
    cost: Number,
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
});

materialUsageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('MaterialUsage', materialUsageSchema)