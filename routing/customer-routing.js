import express from 'express';
import { CustomerService } from '../services/customer-service';
import { Customer } from '../models/customer';

const OK = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const NEW_CUSTOMER_EVENT = 'NewCustomerRecord';

class CustomerRouting {
    constructor(socketIOServer) {
        this.socketIOServer = socketIOServer;
        this.router = express.Router();
        this.customerService = new CustomerService();

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
                let customer = new Customer(
                    body.id,
                    body.customerName,
                    body.address, body.credit, body.status,
                    body.email, body.phone, body.remarks);

                let addedRecord = await this.customerService.addNewCustomer(customer);

                if (addedRecord) {
                    if (this.socketIOServer) {
                        this.socketIOServer.emit(NEW_CUSTOMER_EVENT, addedRecord);
                    }

                    response.status(OK).send(addedRecord);
                }
                else response.status(BAD_REQUEST).send({
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

export {
    CustomerRouting
};
