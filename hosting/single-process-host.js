import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import sio from 'socket.io';
import { CustomerRouting } from '../routing';

const INVALID_PORT = 'Invalid Listener Port Specified!';
const CUSTOMER_SERVICE_URL = '/api/customers';
const WEB_CONTENTS = 'web-content';

class SingleProcessHost {
    constructor(portNumber) {
        if (!portNumber) {
            throw new Error(INVALID_PORT);
        }

        this.portNumber = portNumber;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.socketIOServer = sio.listen(this.httpServer);
        this.customerRouting = new CustomerRouting(this.socketIOServer);

        this.initializeApplication();
    }

    initializeApplication() {
		this.app.use(this.applyCors);
        this.app.use(bodyParser.json());
        this.app.use(CUSTOMER_SERVICE_URL, this.customerRouting.Router);
        this.app.use(express.static(WEB_CONTENTS));
    }
	
	applyCors(request, response, next) {
		response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();		
	}
	
    startServer() {
        let promise = new Promise(
            (resolve, reject) => {
                this.httpServer.listen(this.portNumber, () => {
                    resolve();
                });
            });

        return promise;
    }

    stopServer() {
        let promise = new Promise(
            (resolve, reject) => {
                this.httpServer.close(() => {
                    resolve();
                });
            });

        return promise;
    }
}

export {
    SingleProcessHost
};