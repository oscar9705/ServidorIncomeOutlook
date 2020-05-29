import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Ingreso,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioIngresoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Ingreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ingreso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ingreso>,
  ): Promise<Ingreso[]> {
    return this.usuarioRepository.ingresos(id).find(filter);
  }

  @post('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingreso)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {
            title: 'NewIngresoInUsuario',
            exclude: ['id'],
            optional: ['usuario_id']
          }),
        },
      },
    }) ingreso: Omit<Ingreso, 'id'>,
  ): Promise<Ingreso> {
    return this.usuarioRepository.ingresos(id).create(ingreso);
  }

  @patch('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Usuario.Ingreso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {partial: true}),
        },
      },
    })
    ingreso: Partial<Ingreso>,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.usuarioRepository.ingresos(id).patch(ingreso, where);
  }

  @del('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Usuario.Ingreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.usuarioRepository.ingresos(id).delete(where);
  }
}
