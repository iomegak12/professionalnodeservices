"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerSchema = void 0;
let CustomerSchema = {
  id: Number,
  customerName: String,
  address: String,
  email: String,
  phone: String,
  credit: Number,
  status: Boolean,
  remarks: String
};
exports.CustomerSchema = CustomerSchema;