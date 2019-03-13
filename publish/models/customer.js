"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Customer = void 0;

var _utilities = require("../utilities");

const DELIMITER = ',';

class Customer {
  constructor(id, customerName, address, credit, status, email, phone, remarks) {
    [this.id, this.customerName, this.address, this.credit, this.status, this.remarks, this.email, this.phone] = arguments;
  }

  toString() {
    return _utilities.ObjectFormatter.format(this);
  }

  static create(csvString) {
    if (!csvString) {
      throw new Error("Invalid Argument Specified!");
    }

    let splitted = csvString.split(DELIMITER);
    let customer = new Customer(...splitted);
    return customer;
  }

}

exports.Customer = Customer;