import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: mongoose.Schema.Types.String },
    email: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    position: { type: mongoose.Schema.Types.String },
    enterprise: { type: mongoose.Schema.Types.String },
    active: { type: mongoose.Schema.Types.Boolean },
  },
  { versionKey: false }
);

const users = mongoose.models?.users || mongoose.model("users", usersSchema);

export { users };
