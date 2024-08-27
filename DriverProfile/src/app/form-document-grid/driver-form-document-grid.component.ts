import { Component, Input, OnInit } from '@angular/core';
import { DriverFormDefinitionService } from 'src/service/driver-form-definition.service';
import { DriverService } from 'src/service/driver.service';
import { Driver } from 'src/model/driver';
import { FormioGrid } from '@formio/angular/grid';
import { ToastrService } from 'ngx-toastr';
import { ChangeStatus, Changeable, DocumentContainer } from 'src/model/document-container';

const { Unchanged, Added, Updated, Deleted } = ChangeStatus;

@Component({
  selector: 'driver-form-document-grid',
  templateUrl: './form-document-grid.component.html',
  styleUrls: ['./form-document-grid.component.css'],
  providers: [DriverService, DriverFormDefinitionService]
})
export class DriverGridComponent implements OnInit {
  grid: any;
  originalDocuments: Map<string, Driver> = new Map<string, Driver>();
  _internalIds: Map<string, Driver> = new Map<string, Driver>();
  @Input() documents: DocumentContainer<Driver> = {  data: {dataGrid: []}  };

  constructor(
    private formDocumentService: DriverService,
    private formDefinitionService: DriverFormDefinitionService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.grid = this.formDefinitionService.getFormGrid()
    this.formDocumentService.getFormDocuments().subscribe(docs => {
      // Assign documents with change status tracking properties
      docs.forEach((doc: Driver) => {
        const internalId = this.generateInternalId();
        this._internalIds.set(internalId, doc)
        this.originalDocuments.set(internalId, {...doc});          
      });
      this.documents = {
        data: {
          dataGrid: docs
        }
      };
      console.log("Obtained grid definition: ", this.grid, ", documents=",
            this.documents, ", originalDocs=", this.originalDocuments, "internalIds=", this._internalIds);
    });
  }

  saveChanges(): void {
    console.log("Analyzing loaded documents for changes");
    const modifiedDocuments: Changeable<Driver>[] = this.compareToOriginal(this.documents.data.dataGrid, this._internalIds, this.originalDocuments);
    const addedDocuments = modifiedDocuments.filter((doc: Changeable<Driver>) => doc.changeStatus === Added);
    const updatedDocuments = modifiedDocuments.filter((doc: Changeable<Driver>) => doc.changeStatus === Updated);
    const deletedDocuments = modifiedDocuments.filter((doc: Changeable<Driver>) => doc.changeStatus === Deleted);
  
    if (addedDocuments.length > 0) {
      this.formDocumentService.createFormDocuments(addedDocuments.map(d => d.entry)).subscribe(
        (response) => {
          // Handle success
          this.toastr.success('Created ' + addedDocuments.length + ' form document(s)');
          addedDocuments.forEach((doc: Changeable<Driver>) => this.originalDocuments.set(doc._internalId, {...doc.entry}))
        },
        (error) => {
          // Handle error
          this.toastr.error('Error creating form documents: ' + error);
          console.error('Error creating documents:', error);
        }
      );
    }
  
    if (updatedDocuments.length > 0) {
      this.formDocumentService.updateFormDocuments(updatedDocuments.map(d => d.entry)).subscribe(
        (response) => {
          updatedDocuments.forEach((doc: Changeable<Driver>) => this.originalDocuments.set(doc._internalId, {...doc.entry}))
          // Handle success
          this.toastr.success('Updated ' + updatedDocuments.length + ' form document(s)');
          console.log('Updated documents:', response);
        },
        (error) => {
          // Handle error
          this.toastr.error('Error updating form documents');
          console.error('Error updating documents:', error);
        }
      );
    }
  
    if (deletedDocuments.length > 0) {
      this.formDocumentService.deleteFormDocuments(deletedDocuments.map(d => d.entry)).subscribe(
        (response) => {
          // Handle success
          deletedDocuments.forEach((doc: Changeable<Driver>) => this.originalDocuments.delete(doc._internalId))
          this.toastr.success('Deleted ' + deletedDocuments.length + ' form document(s)');
          console.log('Deleted documents:', response);
        },
        (error) => {
          // Handle error
            this.toastr.error('Error deleting form documents: ' + error);
                  console.error('Error updating documents:', error);
      });
    }
    console.log("Done applying changes");
  }
          
  compareToOriginal(docs: Driver[], documents: Map<string, Driver>, originalDocuments: Map<string, Driver>): Changeable<Driver>[] {
    const result: Changeable<Driver>[] = [];            
    // Check for updated or deleted entries
    for (const originalDocInternalId of originalDocuments.keys()) {
    const originalDoc = originalDocuments.get(originalDocInternalId);
    const curDoc = documents.get(originalDocInternalId);
    const matchedDoc = curDoc ? (docs.includes(curDoc) ? curDoc : null) : null;
    console.log("originalDocInternalId=", originalDocInternalId, ", comparing matchedDoc:\n", matchedDoc, 
      "\noriginalDoc:\n", originalDoc, "\nequal=", matchedDoc && this.isEqual(matchedDoc, originalDoc));
    if (!matchedDoc && originalDoc) {
      console.log("doc=", originalDoc, " was deleted");
      result.push({ entry: originalDoc, changeStatus: Deleted, _internalId: originalDocInternalId });
    } else if (matchedDoc && !this.isEqual(originalDoc, matchedDoc)) {
      result.push({ entry: matchedDoc, changeStatus: Updated, _internalId: originalDocInternalId });
    }
  }
  
  // Check for added entries
  for (const doc of docs) {
    const docPresent = Array.from(documents.values()).includes(doc);
    console.log("doc=", doc, ", matchedOriginalDoc=", docPresent);
    if (!docPresent) {
      result.push({ entry: doc, changeStatus: Added, _internalId: this.generateInternalId() });
    }
  }
  
  return result;
  }
  
  private generateInternalId(): string {
    // Generate a random internal ID
    return Math.random().toString(36).substring(5);
  }
  
  private isEqual(obj1: any, obj2: any): boolean {
    // Perform deep property-wise comparison between objects
    const str1: string = JSON.stringify(this.sortObjectKeys(obj1), this.nullBlanker) ;
    const str2: string = JSON.stringify(this.sortObjectKeys(obj2), this.nullBlanker);
    return str1 === str2;
  }
  
  nullBlanker = (key: string, value: Object) => (value === null || value === '') ? undefined : value;
  
  private sortObjectKeys(obj: any): any {
    const sortedKeys = Object.keys(obj).sort();
    return sortedKeys.reduce((sortedObj:{ [key: string]: any }, key) => {
      sortedObj[key] = obj[key];
      return sortedObj;
    }, {});
  }

}
