import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver } from 'src/model/driver';

interface FormDocumentResponse {
  isBase64Encoded: null | boolean;
  headers: null | Record<string, string>;
  body: string;
  statusCode: number;
  multiValueHeaders: null | Record<string, string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private url: string = 'https://lambda-dsl-sample.paas.noteinweb.com/production/driver';

  constructor(private http: HttpClient) {}

  getFormDocuments(): Observable<Driver[]> {
    return this.http.post<FormDocumentResponse>(this.url, { body: '{}', httpMethod: 'GET' })
      .pipe(map((resp: FormDocumentResponse) => JSON.parse(resp.body) as Driver[]));
  }

  createFormDocuments(documents: Driver[]): Observable<Driver[]> {
    const requestBody = { body: JSON.stringify(documents), httpMethod: 'POST' };
    return this.http.post<any>(this.url, requestBody);
  }
  
  updateFormDocuments(documents: Driver[]): Observable<Driver[]> {
    const requestBody = { body: JSON.stringify(documents), httpMethod: 'PUT' };
    return this.http.post<any>(this.url, requestBody);
  }
  
  deleteFormDocuments(documents: Driver[]): Observable<Driver[]> {
    const documentIds = documents.map((doc: Driver) => 
                                this.escapeId(doc.name.toString())).join(';');
    const body = JSON.stringify({ documentIds });
    const payload = { body, httpMethod: 'DELETE' };
    return this.http.post<any>(this.url, payload);
  }
  
  private escapeId(id: string): string {
    return id.replace(';', '\\;');
  }
}
