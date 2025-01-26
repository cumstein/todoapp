import { Schema, model, models } from "mongoose";

const user2Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  todos: [{ title: String, status: String }],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User2 = models.User2 || model("User2", user2Schema);

export default User2;
