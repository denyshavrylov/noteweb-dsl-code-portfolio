"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
class CustomerRepository {
    constructor(documentClient) {
        this.documentClient = documentClient;
    }
    async getAll() {
        const params = {
            TableName: 'Customer'
        };
        const result = await this.documentClient.scan(params).promise();
        return result.Items;
    }
    async getById(id) {
        const params = {
            TableName: 'Customer',
            Key: {
                customer_id: id
            }
        };
        const result = await this.documentClient.get(params).promise();
        return result.Item;
    }
    async create(customer) {
        const params = {
            TableName: 'Customer',
            Item: customer
        };
        await this.documentClient.put(params).promise();
        return customer;
    }
    async update(id, updatedCustomer) {
        const params = {
            TableName: 'Customer',
            Key: {
                'customer_id': id,
            },
            UpdateExpression: 'set #first_name = :first_name, #email = :email, #interest = :interest, #last_name = :last_name, #phone = :phone',
            ExpressionAttributeNames: {
                '#first_name': 'first_name', '#email': 'email', '#interest': 'interest', '#last_name': 'last_name', '#phone': 'phone'
            },
            ExpressionAttributeValues: {
                ':first_name': updatedCustomer.first_name, ':email': updatedCustomer.email, ':interest': updatedCustomer.interest, ':last_name': updatedCustomer.last_name, ':phone': updatedCustomer.phone
            },
            ReturnValues: 'ALL_NEW'
        };
        const result = await this.documentClient.update(params).promise();
        return result.Attributes;
    }
    async delete(id) {
        const params = {
            TableName: 'Customer',
            Key: {
                'customer_id': id,
            },
            ReturnValues: 'ALL_OLD'
        };
        const result = await this.documentClient.delete(params).promise();
        return result.Attributes;
    }
}
exports.CustomerRepository = CustomerRepository;
