import {Schema, model} from "mongoose";
import { handleMongooseError, validateAtUpdate } from "../helpers/index.js";

const contactSchema = new Schema({
    
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      
}, {versionKey: false, timestamps: true});

contactSchema.pre("findOneAndUpdate", validateAtUpdate);

contactSchema.post("save", handleMongooseError);
contactSchema.post("findOneAndUpdate", handleMongooseError);

const Contact = model("contact", contactSchema);


export default Contact;