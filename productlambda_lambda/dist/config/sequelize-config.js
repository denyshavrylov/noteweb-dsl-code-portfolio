"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;
// Configure AWS SDK with region
aws_sdk_1.default.config.update({ region: process.env.AWS_REGION });
// Create a Secrets Manager client
const secretsManager = new aws_sdk_1.default.SecretsManager();
/*
async function getSecretValue(secretName: string) { // TODO change to dotenv or aws lambda powertools
  try {
    // Fetch the secret value
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

    if (data.SecretString) {
      // If the secret is in plain text format
      return JSON.parse(data.SecretString);
    } else {
      // If the secret is in binary format (base64 encoded)
      const buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString('utf-8'));
    }
  } catch (error) {
    console.error('Error fetching secret ' + secretName, error);
    throw error;
  }
}

// Example usage
const secretName = 'productlambda-secret';
var dbPassword = 'NOT RETRIEVED';

getSecretValue(secretName)
  .then(secretValue => {
    // Assuming the secret contains a JSON object with a key "password"
    dbPassword = secretValue.password;
    console.debug('Database password: ' + dbPassword);
  })
  .catch(error => {
    console.error('Failed to retrieve secret:', error);
  });
*/
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
});
sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
