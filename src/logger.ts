import * as winston from "winston";
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "combined.log" }),
    ],
  });

class Logger {
    private persist: boolean;

    constructor(shouldLog: boolean) {
        this.persist = shouldLog;
    }

    public debug(msg: string, ...params: any[]) {
        if (this.persist) {
            winston.log.apply(this, ["debug", msg].concat(params));
            logger.debug(["debug", msg].concat(params));
        } else {
            /* tslint:disable:no-console */
            console.log(["debug", msg].concat(params));
        }
    }

    public info(msg: string, ...params: any[]) {
        if (this.persist) {
            winston.log.apply(this, ["info", msg].concat(params));
        } else {
            /* tslint:disable:no-console */
            console.log(["info", msg].concat(params));
        }
    }

    public warn(msg: string, ...params: any[]) {
        if (this.persist) {
            winston.log.apply(this, ["warn", msg].concat(params));
        } else {
            /* tslint:disable:no-console */
            console.log(["warn", msg].concat(params));
        }
    }

    public error(msg: string, ...params: any[]) {
        if (this.persist) {
            winston.log.apply(this, ["error", msg].concat(params));
        } else {
            /* tslint:disable:no-console */
            console.log(["error", msg].concat(params));
        }
    }
}

export default function(persist: boolean = true) {
    return new Logger(persist);
}
