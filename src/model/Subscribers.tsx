import mongoose, { Schema, model, models } from 'mongoose';

const SubscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
});

const Subscriber = models.Subscriber || model('Subscriber', SubscriberSchema);

export default Subscriber;
