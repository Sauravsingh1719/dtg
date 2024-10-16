import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    review:{
        type:String,
        required: true
    },
    designation:{
        type: String,
        required: true
    }
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;