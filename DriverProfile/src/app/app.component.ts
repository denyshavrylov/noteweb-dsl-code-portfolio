import { Component, OnInit, HostListener } from '@angular/core';
import { DriverService } from '../service/driver.service';
import { DriverFormDefinitionService } from '../service/driver-form-definition.service';
import { Driver } from '../model/driver';          
import { Changeable, DocumentContainer } from '../model/document-container';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DriverService, DriverFormDefinitionService]
})
export class AppComponent implements OnInit {
  driverDocuments: DocumentContainer<Driver> =  { data: { dataGrid: [] } };
  driverSelectedDocument: any;
    selectedLayout = 'list-details';
  title = 'nw-app-sample';

  constructor(
      //private formDocumentService: DriverService,
    //private formDefinitionService: DriverFormDefinitionService    
  ) { }
  
  ngOnInit() {
  // Initialize documents
  //this.documents = this.formDocumentService.getFormDocuments();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(/*event*/) {
    this.setLayout();
  }
  
  get isCompact(): boolean {
    return window.innerWidth < 640;
  }
  
  get isMedium(): boolean {
    return window.innerWidth >= 640 && window.innerWidth < 840;
  }
  
  get isExpanded(): boolean {
    return window.innerWidth >= 840;
  }

  setLayout() {
    console.log("Updating layout")
  }
}
