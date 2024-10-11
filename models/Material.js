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

  const materialSchema = new mongoose.Schema({
    name: String,
    unit: String, // e.g., kg, liters, etc.
});

materialSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Material', materialSchema)