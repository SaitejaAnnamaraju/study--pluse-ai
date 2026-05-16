import mongoose from 'mongoose';

const memoryRecords = [];

const learningRecordSchema = new mongoose.Schema({
  type: { type: String, required: true },
  subjectId: String,
  userId: String,
  payload: Object,
  createdAt: { type: Date, default: Date.now }
});

const LearningRecord = mongoose.models.LearningRecord || mongoose.model('LearningRecord', learningRecordSchema);

export async function saveLearningRecord({ type, subjectId, userId = 'demo-user', payload }) {
  const record = { type, subjectId, userId, payload, createdAt: new Date() };
  if (mongoose.connection.readyState === 1) {
    try {
      return await LearningRecord.create(record);
    } catch {
      memoryRecords.push(record);
      return record;
    }
  }
  memoryRecords.push(record);
  return record;
}

export function getMemoryRecords() {
  return memoryRecords;
}
