import { Guid } from 'guid-typescript';

export class Entity {
  public id: string;
  public constructor(id: string = Guid.raw()) {
    this.id = Guid.raw();
  }

  public static Empty() {
    return new Entity(Guid.EMPTY);
  }
}
