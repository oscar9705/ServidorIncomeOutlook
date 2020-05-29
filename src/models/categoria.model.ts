import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ingreso} from './ingreso.model';

@model()
export class Categoria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  id_usuario: number;

  @hasMany(() => Ingreso, {keyTo: 'categoria_id'})
  ingresoCategoria: Ingreso[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria | CategoriaRelations;
