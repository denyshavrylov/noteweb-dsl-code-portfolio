import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { {{ entity.class }} } from '../model/{{ entity.class | lower }}';

export class {{ entity.class }}Repository {
  private readonly documentClient: DocumentClient;

  constructor(documentClient: DocumentClient) {
    this.documentClient = documentClient;
  }

  async getAll(): Promise<{{ entity.class }}[]> {
    const params: DocumentClient.ScanInput = {
      TableName: '{{ entity.class }}'
    };

    const result = await this.documentClient.scan(params).promise();
    return result.Items as {{ entity.class }}[];
  }

  async getById(id: string): Promise<{{ entity.class }} | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: '{{ entity.class }}',
      Key: {
        {% for field in entity.fields %}{% if field.id is defined %}{{ field.name }}: id{% endif %}{% endfor %}
      }
    };

    const result = await this.documentClient.get(params).promise();
    return result.Item as {{ entity.class }} | null;
  }

  async create({{ entity.class | lower }}: {{ entity.class }}): Promise<{{ entity.class }}> {
    const params: DocumentClient.PutItemInput = {
      TableName: '{{ entity.class }}',
      Item: {{ entity.class | lower }}
    };

    await this.documentClient.put(params).promise();
    return {{ entity.class | lower }};
  }

  async update(id: string, updated{{ entity.class }}: Partial<{{ entity.class }}>): Promise<{{ entity.class }} | null> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: '{{ entity.class }}',
      Key: {
        {% for field in entity.fields %}{% if field.id is defined %}'{{ field.name }}': id{% if not loop.last %},{% endif %}{% endif %}{% endfor %}
      },
      UpdateExpression: 'set {% for field in entity.fields %}{% if not field.id is defined %}#{{ field.name }} = :{{ field.name }}{% if not loop.last %}, {% endif %}{% endif %}{% endfor %}',
      ExpressionAttributeNames: {
        {% for field in entity.fields %}{% if not field.id is defined %}'#{{ field.name }}': '{{ field.name }}'{% if not loop.last %},{% endif %}{% endif %}{% endfor %}
      },
      ExpressionAttributeValues: {
        {% for field in entity.fields %}{% if not field.id is defined %}':{{ field.name }}': updated{{ entity.class }}.{{ field.name }}{% if not loop.last %},{% endif %}{% endif %}{% endfor %}
      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await this.documentClient.update(params).promise();
    return result.Attributes as {{ entity.class }} | null;
  }

  async delete(id: string): Promise<{{ entity.class }} | null> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: '{{ entity.class }}',
      Key: {
        {% for field in entity.fields %}{% if field.id is defined %}'{{ field.name }}': id{% if not loop.last %},{% endif %}{% endif %}{% endfor %}
      },
      ReturnValues: 'ALL_OLD'
    };

    const result = await this.documentClient.delete(params).promise();
    return result.Attributes as {{ entity.class }} | null;
  }

}

