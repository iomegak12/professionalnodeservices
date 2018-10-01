import Mongoose from 'mongoose';
import { CustomerSchema } from '../schemas';

class DbManager {
    constructor() {
        try {
            this.connection = Mongoose;
            this.connection.Promise = global.Promise;
            this.customerModel = this.connection.model("customers",
                Mongoose.Schema(CustomerSchema));
        } catch (error) {
            throw error;
        }
    }
}

export {
    DbManager
};
