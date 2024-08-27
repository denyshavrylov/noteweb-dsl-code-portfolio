import { createLogger, transports, format } from 'winston';

export const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});

export class Metrics {
  static addMetric(name: string, unit: string, value: number) {
    // Implement your metrics logic here
  }
}

export class MetricUnits {
  static Count = 'Count';
  static Seconds = 'Seconds';
}

export class Tracer {
  static captureMethod() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = async function(...args: any[]) {
        console.log(`Entering method ${propertyKey}`);
        const result = await originalMethod.apply(this, args);
        console.log(`Exiting method ${propertyKey}`);
        return result;
      }
    }
  }
}

