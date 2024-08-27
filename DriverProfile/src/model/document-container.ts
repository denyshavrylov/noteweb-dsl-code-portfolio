export enum ChangeStatus {
  Unchanged = 'unchanged',
  Added = 'added',
  Updated = 'updated',
  Deleted = 'deleted'
}
  
export type Changeable<T> = {
  entry: T
  changeStatus: ChangeStatus;
  _internalId: string;
};
  
export type DocumentContainer<T> = {
  data: { dataGrid: T[] }
}
