"use strict";

var _customerService = require("./customer-service");

(function () {
  let service = new _customerService.CustomerService();
  let promise = service.getCustomerDetail(11);
  promise.then(result => console.log(result), error => console.log('Error Occurred ... ' + error));
})();