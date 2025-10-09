import mongoose from "mongoose";

const bestSellerItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const dailySalesReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
    userStatistics: [
      {
        date: {
          type: Date,
          required: true,
        },
        totalQuantityOfOpenCommands: { type: Number, default: 0 },
        totalQuantity: { type: Number, default: 0 },
        bestSeller: [bestSellerItemSchema],
      },
    ],
  },
  { timestamps: true },
  { _id: false }
);

const dailySalesReport =
  mongoose.models?.dailySalesReport ||
  mongoose.model("dailySalesReport", dailySalesReportSchema);

export { dailySalesReport };
