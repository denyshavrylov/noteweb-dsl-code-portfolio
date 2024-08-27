import { Sequelize, Dialect } from 'sequelize';
import AWS from 'aws-sdk';

const database: string  = process.env.DB_NAME!;
const username: string  = process.env.DB_USER!;
const password: string  = process.env.DB_PASSWORD!;
const host: string      = process.env.DB_HOST!;
const dialect: Dialect  = (process.env.DB_DIALECT! as Dialect);

// Configure AWS SDK with region
AWS.config.update({ region: process.env.AWS_REGION });

// Create a Secrets Manager client
const secretsManager = new AWS.SecretsManager();
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

const sequelize = new Sequelize(database, username, password, {
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

export default sequelize;

