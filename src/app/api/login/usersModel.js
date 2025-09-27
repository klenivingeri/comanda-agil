import mongoose from "mongoose";

import { tenantSchema } from "./create/tenantModel";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    position: {
      type: String,
      enum: ["master", "admin", "gm", "user"],
      default: "user",
    },
    tenant: tenantSchema,
    active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const users = mongoose.models?.users || mongoose.model("users", usersSchema);

export { users };
