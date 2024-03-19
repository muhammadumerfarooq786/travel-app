import mongoose from "mongoose";
import user_model from "./user_model.js";

const travel_db = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user_model,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    travel_date: {
      type: String,
      required: true,
    },
    activities_list: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
    },
    priority: {
      type: String,
    },
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

travel_db.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const travel_model = mongoose.model("Travel", travel_db);

export default travel_model;
