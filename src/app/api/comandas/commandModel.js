import mongoose from "mongoose";

const commandsSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    payment: {
      method: {
        type: String,
        enum: ["CASH", "CARD", "PIX", "OTHER", ""], // pode adicionar mais métodos
        required: true,
      },
      amount: { type: Number, required: true },
      status: {
        id: {
          type: String,
          enum: ["PAID", "PENDING", "CANCELLED"], // status possíveis
          default: "PENDING",
        },
      },
    },
    subOrders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: mongoose.Schema.Types.Number, default: 0 },
        userId: { type: String },
      },
    ],
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
  }
);

const commands =
  mongoose.models?.commands || mongoose.model("commands", commandsSchema);

export { commands };
