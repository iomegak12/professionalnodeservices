"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerService = void 0;

var _dbManager = require("../db-management/db-manager");

var _connectionStringBuilder = require("../config/connection-string-builder");

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';

class CustomerService {
  constructor() {
    this.connectionString = _connectionStringBuilder.ConnectionStringBuilder.getConnectionString();
    this.dbManager = new _dbManager.DbManager();
  }

  async getCustomers() {
    try {
      await this.dbManager.connection.connect(this.connectionString, {
        useNewUrlParser: true
      });
      let customers = await this.dbManager.customerModel.find({});
      return customers;
    } catch (error) {
      throw error;
    } finally {
      await this.dbManager.connection.disconnect();
    }
  }

  async getCustomerDetail(customerId) {
    if (!customerId) {
      throw new Error(INVALID_ARGUMENTS);
    }

    try {
      await this.dbManager.connection.connect(this.connectionString, {
        useNewUrlParser: true
      });
      let filteredCustomer = await this.dbManager.customerModel.findOne({
        id: customerId
      });
      return filteredCustomer;
    } catch (error) {
      throw error;
    } finally {
      await this.dbManager.connection.disconnect();
    }
  }

  async addNewCustomer(customer) {
    let validation = customer && customer.id && customer.customerName;
    if (!validation) throw new Error(INVALID_ARGUMENTS);

    try {
      await this.dbManager.connection.connect(this.connectionString, {
        useNewUrlParser: true
      });
      let savedRecord = await this.dbManager.customerModel.create(customer);
      return savedRecord;
    } catch (error) {
      throw error;
    } finally {
      await this.dbManager.connection.disconnect();
    }
  }

}

exports.CustomerService = CustomerService;