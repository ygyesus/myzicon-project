const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  incomeSoFar: { type: Number, default: 0 },
  incomeExpected: { type: Number, default: 0 },
  expenseSoFar: { type: Number, default: 0 },
  expenseExpected: { type: Number, default: 0 },
  taskIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  userIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Project', projectSchema);
