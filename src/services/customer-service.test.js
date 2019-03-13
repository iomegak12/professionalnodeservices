import { CustomerService } from './customer-service';

(function () {
    let service = new CustomerService();

    let promise = service.getCustomerDetail(11);

    promise.then(result => console.log(result),
        error => console.log('Error Occurred ... ' + error));
})();