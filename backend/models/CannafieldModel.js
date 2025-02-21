const { required } = require("joi");
const mongoose = require("mongoose");

const CannafieldModel = mongoose.Schema(
  {
    isShow: {
      type: Boolean,
      default: false,
    },
    num: {
      type: Number,
      required: true,
    },
    pieces: [
      {
        id: {
          type: Number,
          required: true,
        },
        isSelected: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cannafield = mongoose.model("Cannafield", CannafieldModel);
module.exports = Cannafield;
