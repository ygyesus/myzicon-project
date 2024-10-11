const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], required: true },
  incomeExpected: { type: Number, required: true },
  expenseExpected: { type: Number, required: true }
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Task', taskSchema);
