
import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  workMail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String },
  industry: { type: String },
  country: { type: String },
  howDidYouHear: { type: String },
  message: { type: String },
  status: { type: String, default: 'Upcoming' }, // Add this field
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema);
