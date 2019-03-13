"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerRouting = void 0;

var _express = _interopRequireDefault(require("express"));

var _customerService = require("../services/customer-service");

var _customer = require("../models/customer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OK = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const NEW_CUSTOMER_EVENT = 'NewCustomerRecord';

class CustomerRouting {
  constructor(socketIOServer) {
    this.socketIOServer = socketIOServer;
    this.router = _express.default.Router();
    this.customerService = new _customerService.CustomerService();
    this.initializeRouting();
  }

  initializeRouting() {
    this.router.get('/', async (request, response) => {
      try {
        let customers = await this.customerService.getCustomers();
        response.status(OK).send(customers);
      } catch (error) {
        console.log(error);
        response.status(SERVER_ERROR).send({
          errorMessage: JSON.stringify(error)
        });
      }
    });
    this.router.get('/detail/:id', async (request, response) => {
      try {
        let customerId = parseInt(request.params.id);

        if (!customerId) {
          response.status(BAD_REQUEST).send({
            errorMessage: INVALID_ARGUMENTS
          });
        }

        let filteredCustomer = await this.customerService.getCustomerDetail(customerId);
        response.status(OK).send(filteredCustomer);
      } catch (error) {
        response.status(SERVER_ERROR).send({
          errorMessage: JSON.stringify(error)
        });
      }
    });
    this.router.post('/', async (request, response) => {
      try {
        let body = request.body;
        let customer = new _customer.Customer(body.id, body.customerName, body.address, body.credit, body.status, body.email, body.phone, body.remarks);
        let addedRecord = await this.customerService.addNewCustomer(customer);

        if (addedRecord) {
          if (this.socketIOServer) {
            this.socketIOServer.emit(NEW_CUSTOMER_EVENT, addedRecord);
          }

          response.status(OK).send(addedRecord);
        } else response.status(BAD_REQUEST).send({
          error: INVALID_ARGUMENTS
        });
      } catch (error) {
        response.status(SERVER_ERROR).send({
          errorMessage: JSON.stringify(error)
        });
      }
    });
  }

  get Router() {
    return this.router;
  }

}

exports.CustomerRouting = CustomerRouting;