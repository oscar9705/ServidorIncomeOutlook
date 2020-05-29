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
  Categoria,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCategoriaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/categorias', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Categoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.usuarioRepository.categorias(id).find(filter);
  }

  @post('/usuarios/{id}/categorias', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoriaInUsuario',
            exclude: ['id'],
            optional: ['id_usuario']
          }),
        },
      },
    }) categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    return this.usuarioRepository.categorias(id).create(categoria);
  }

  @patch('/usuarios/{id}/categorias', {
    responses: {
      '200': {
        description: 'Usuario.Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.usuarioRepository.categorias(id).patch(categoria, where);
  }

  @del('/usuarios/{id}/categorias', {
    responses: {
      '200': {
        description: 'Usuario.Categoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.usuarioRepository.categorias(id).delete(where);
  }
}
