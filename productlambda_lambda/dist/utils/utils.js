"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracer = exports.MetricUnits = exports.Metrics = exports.Logger = void 0;
const winston_1 = require("winston");
exports.Logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'combined.log' })
    ]
});
class Metrics {
    static addMetric(name, unit, value) {
        // Implement your metrics logic here
    }
}
exports.Metrics = Metrics;
class MetricUnits {
}
exports.MetricUnits = MetricUnits;
MetricUnits.Count = 'Count';
MetricUnits.Seconds = 'Seconds';
class Tracer {
    static captureMethod() {
        return function (target, propertyKey, descriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = async function (...args) {
                console.log(`Entering method ${propertyKey}`);
                const result = await originalMethod.apply(this, args);
                console.log(`Exiting method ${propertyKey}`);
                return result;
            };
        };
    }
}
exports.Tracer = Tracer;
