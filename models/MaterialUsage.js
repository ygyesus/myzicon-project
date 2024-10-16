const mongoose = require('mongoose');

const materialUsageSchema = new mongoose.Schema({
  materialID: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  taskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }
});

materialUsageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('MaterialUsage', materialUsageSchema);
