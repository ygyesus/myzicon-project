const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  employmentPeriods: [{
    projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    expenseSoFar: { type: Number, required: true },
    expenseExpected: { type: Number, required: true },
    monthlyPayment: { type: Number, required: true }
  }]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
