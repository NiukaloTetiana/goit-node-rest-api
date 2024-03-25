import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongoseError.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
  },
  { versionKey: false }
);

contactsSchema.post("save", handleMongooseError);

export const Contact = model("contact", contactsSchema);
