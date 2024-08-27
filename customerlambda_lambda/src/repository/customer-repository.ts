import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Customer } from '../model/customer';

export class CustomerRepository {
  private readonly documentClient: DocumentClient;

  constructor(documentClient: DocumentClient) {
    this.documentClient = documentClient;
  }

  async getAll(): Promise<Customer[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Customer'
    };

    const result = await this.documentClient.scan(params).promise();
    return result.Items as Customer[];
  }

  async getById(id: string): Promise<Customer | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'Customer',
      Key: {
        customer_id: id      }
    };

    const result = await this.documentClient.get(params).promise();
    return result.Item as Customer | null;
  }

  async create(customer: Customer): Promise<Customer> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Customer',
      Item: customer
    };

    await this.documentClient.put(params).promise();
    return customer;
  }

  async update(id: string, updatedCustomer: Partial<Customer>): Promise<Customer | null> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Customer',
      Key: {
        'customer_id': id,      },
      UpdateExpression: 'set #first_name = :first_name, #email = :email, #interest = :interest, #last_name = :last_name, #phone = :phone',
      ExpressionAttributeNames: {
        '#first_name': 'first_name','#email': 'email','#interest': 'interest','#last_name': 'last_name','#phone': 'phone'      },
      ExpressionAttributeValues: {
        ':first_name': updatedCustomer.first_name,':email': updatedCustomer.email,':interest': updatedCustomer.interest,':last_name': updatedCustomer.last_name,':phone': updatedCustomer.phone      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await this.documentClient.update(params).promise();
    return result.Attributes as Customer | null;
  }

  async delete(id: string): Promise<Customer | null> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'Customer',
      Key: {
        'customer_id': id,      },
      ReturnValues: 'ALL_OLD'
    };

    const result = await this.documentClient.delete(params).promise();
    return result.Attributes as Customer | null;
  }

}

