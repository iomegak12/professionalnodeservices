"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleProcessHost = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _routing = require("../routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INVALID_PORT = 'Invalid Listener Port Specified!';
const CUSTOMER_SERVICE_URL = '/api/customers';
const WEB_CONTENTS = 'web-content';

class SingleProcessHost {
  constructor(portNumber) {
    if (!portNumber) {
      throw new Error(INVALID_PORT);
    }

    this.portNumber = portNumber;
    this.app = (0, _express.default)();
    this.httpServer = _http.default.createServer(this.app);
    this.socketIOServer = _socket.default.listen(this.httpServer);
    this.customerRouting = new _routing.CustomerRouting(this.socketIOServer);
    this.initializeApplication();
  }

  initializeApplication() {
    this.app.use(this.applyCors);
    this.app.use(_bodyParser.default.json());
    this.app.use(CUSTOMER_SERVICE_URL, this.customerRouting.Router);
    this.app.use(_express.default.static(WEB_CONTENTS));
  }

  applyCors(request, response, next) {
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  }

  startServer() {
    let promise = new Promise((resolve, reject) => {
      this.httpServer.listen(this.portNumber, () => {
        resolve();
      });
    });
    return promise;
  }

  stopServer() {
    let promise = new Promise((resolve, reject) => {
      this.httpServer.close(() => {
        resolve();
      });
    });
    return promise;
  }

}

exports.SingleProcessHost = SingleProcessHost;