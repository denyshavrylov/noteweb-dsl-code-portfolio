import { Component, Input, OnInit } from '@angular/core';
import { Driver } from 'src/model/driver';
import { Changeable, ChangeStatus } from 'src/model/document-container';
import { DriverFormDefinitionService } from 'src/service/driver-form-definition.service';

@Component({
  selector: 'driver-form-document-detail',
  templateUrl: './form-document-detail.component.html',
  styleUrls: ['./form-document-detail.component.css']
})
export class DriverDetailComponent implements OnInit  {
  @Input() document: Changeable<Driver> | null = null;
  form: any;
  constructor(private formDefinitionService: DriverFormDefinitionService){}
  
  formioOptions = {
    noAlerts: true
  };
      
  ngOnInit() {
    this.form = this.formDefinitionService.getFormDefinition();
  }
}
