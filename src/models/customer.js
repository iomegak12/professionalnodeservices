import { ObjectFormatter } from '../utilities';

const DELIMITER = ',';

class Customer {
    constructor(id, customerName, address, credit, status, email, phone, remarks) {
        [
            this.id, this.customerName,
            this.address, this.credit,
            this.status, this.remarks,
            this.email, this.phone
        ] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }

    static create(csvString) {
        if(!csvString) {
            throw new Error("Invalid Argument Specified!");
        }

        let splitted = csvString.split(DELIMITER);
        let customer = new Customer(...splitted);

        return customer;
    }
}

export {
    Customer
};
