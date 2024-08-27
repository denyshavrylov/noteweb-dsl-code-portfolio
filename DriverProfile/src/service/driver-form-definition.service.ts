import { Injectable } from '@angular/core';
import { Driver } from '../model/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverFormDefinitionService {
  private formDefinition = {
    id: 'DriverFormDefinition',
    components: [
            {
        type: 'textfield',
        key: 'name',
        label: 'Name'
      },            {
        type: 'textfield',
        key: 'executorMemory',
        label: 'Executor Memory'
      },            {
        type: 'textfield',
        key: 'proxyUser',
        label: 'Proxy User'
      },            {
        type: 'textfield',
        key: 'driverCores',
        label: 'Driver Cores'
      },            {
        type: 'textfield',
        key: 'className',
        label: 'Class Name'
      },            {
        type: 'textfield',
        key: 'driverMemory',
        label: 'Driver Memory'
      },            {
        type: 'textfield',
        key: 'file',
        label: 'File'
      },            {
        type: 'textfield',
        key: 'type',
        label: 'Type'
      },            {
        type: 'textfield',
        key: 'numberofExecutors',
        label: 'Numberof Executors'
      },            {
        type: 'textfield',
        key: 'executorCores',
        label: 'Executor Cores'
      }          ]
  };

  constructor() {}

  getFormDefinition() {
    return this.formDefinition;
  }

  getFormGrid() {
      // transform passed form definition to render in grid and only supplied columns!
      return {
        components: [
          {
            label: 'Driver Grid View',
            type: 'datagrid',
            input: true,
            components: this.getFormDefinition().components
          }
        ]
      }
  }
}
