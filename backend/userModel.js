import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: Number,
      lng: Number,
    },
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

export const wrokshopTwelveUsers = mongoose.model(
  "wrokshopTwelveUsers",
  userSchema
);
