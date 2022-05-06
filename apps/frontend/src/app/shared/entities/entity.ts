import { Guid } from 'guid-typescript';

export abstract class Entity {
  public id: string;
  public constructor() {
    this.id = Guid.raw();
  }
}
