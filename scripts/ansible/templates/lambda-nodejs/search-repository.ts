import { Client } from '@opensearch-project/opensearch';
import { Credentials } from 'aws-sdk';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws-sigv4';
import { {{ item.class }}ListResponse, {{ item.class }}Response } from '../model/{{ item.class | lower }}-model';
import { logger, tracer } from '../utils/utils';

class {{ item.class }}SearchRepository {
    private static region = 'eu-west-1'; // Set the appropriate region
    private static service = 'es';
    private static credentials = new Credentials();
    private static signer = new AwsSigv4Signer({
        region: this.region,
        service: this.service,
        getCredentials: () => Promise.resolve(this.credentials),
    });
    private static es = new Client({
        node: process.env.SEARCH_ENGINE_URL,
        Connection: this.signer,
        ssl: {
            rejectUnauthorized: true,
        },
        maxRetries: 5,
        requestTimeout: 60000,
        sniffOnStart: true,
    });

    static async index({{ item.class | lower }}: Record<string, any>): Promise<void> {
        // Index a new {{ item.class | lower }}
        logger.debug(`Indexing {{ item.class | lower }}: ${JSON.stringify({{ item.class | lower }})}`);
        await this.es.index({
            index: '{{ item.index }}',
            id: {{ item.class | lower }}['{% for field in item.fields %}{% if field.id is defined %}{{ field.name }}{% endif %}{% endfor %}'],
            body: {{ item.class | lower }},
        });
    }

    static async upsert({{ item.class | lower }}_id: string, {{ item.class | lower }}: Record<string, any>): Promise<void> {
        // Update or insert a {{ item.class | lower }}
        logger.info(`Upserting ${ {{ item.class | lower }}_id } with : ${JSON.stringify({{ item.class | lower }})}`);

        // Convert the object to a dictionary if it's an instance of a class
        if (typeof {{ item.class | lower }} === 'object' && '{{ item.class | lower }}' in {{ item.class | lower }}) {
            {{ item.class | lower }} = {{ item.class | lower }}.toJSON();
        }
        await this.es.update({
            index: '{{ item.index }}',
            id: {{ item.class | lower }}_id,
            body: {
                doc: {{ item.class | lower }},
                doc_as_upsert: true,
            },
        });
    }

    static async delete({{ item.class | lower }}_id: string): Promise<void> {
        // Delete a {{ item.class | lower }}
        await this.es.delete({
            index: '{{ item.index }}',
            id: {{ item.class | lower }}_id,
        });
    }

    static async query(query: Record<string, any>): Promise<{{ item.class }}ListResponse> {
        // Query {{ item.class | lower }}s
        const response = await this.es.search({
            index: '{{ item.index }}',
            body: query,
        });

        // Extract the hits from the response
        const hits = response.body.hits?.hits || [];

        // Convert hits into a list of {{ item.class | lower }} records
        const {{ item.class | lower }}s = hits.map((hit: any) => {{ item.class }}Response.fromJSON(hit._source));

        // Create a result dictionary to match the {{ item.class }}ListResponse structure
        const result = {
            '{{ item.class | lower }}s': {{ item.class | lower }}s,
            'next_token': 'UNDEFINED', // TODO: implement handling scroll API (?)
        };

        // Convert and validate the result using the {{ item.class }}ListResponse model
        return new {{ item.class }}ListResponse(result);
    }
}

export default {{ item.class }}SearchRepository;

