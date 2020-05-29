import {Entity, model, property, hasMany} from '@loopback/repository';
import { Ingreso } from './ingreso.model';
import {Categoria} from './categoria.model';

@model()
export class Usuario extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'boolean',
    required: true,
  })
  active: boolean;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'string'
  })
  codigo?: string;

  @property({
    type: 'Date'
  })
  fechaRecuperacion?: Date;

  @hasMany(() => Ingreso, {keyTo: 'usuario_id'})
  ingresos: Ingreso[];

  @hasMany(() => Categoria, {keyTo: 'id_usuario'})
  categorias: Categoria[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario | UsuarioRelations;
