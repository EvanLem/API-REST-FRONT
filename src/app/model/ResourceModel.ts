export abstract class ResourceModel<T> {
  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
    if (this.createdAt) {
      this.createdAt = new Date(this.createdAt);
    }
    if (this.updatedAt) {
      this.updatedAt = new Date(this.updatedAt);
    }
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}
