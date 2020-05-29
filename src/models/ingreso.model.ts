import {Entity, model, property} from '@loopback/repository';

@model()
export class Ingreso extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  categoria_id: number;

  @property({
    type: 'number',
    required: true,
  })
  usuario_id: number;

  @property({
    type: 'string',
  })
  ubicacion?: string;

  @property({
    type: 'string',
  })
  archivo?: string;


  constructor(data?: Partial<Ingreso>) {
    super(data);
  }
}

export interface IngresoRelations {
  // describe navigational properties here
}

export type IngresoWithRelations = Ingreso | IngresoRelations;
