
import mongoose from 'mongoose';

const editHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changes: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

const EditHistory = mongoose.model('EditHistory', editHistorySchema);
export default EditHistory;
