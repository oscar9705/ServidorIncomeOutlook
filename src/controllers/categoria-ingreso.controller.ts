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
  Categoria,
  Ingreso,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaIngresoController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Ingreso',
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
    return this.categoriaRepository.ingresoCategoria(id).find(filter);
  }

  @post('/categorias/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingreso)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {
            title: 'NewIngresoInCategoria',
            exclude: ['id'],
            optional: ['categoria_id']
          }),
        },
      },
    }) ingreso: Omit<Ingreso, 'id'>,
  ): Promise<Ingreso> {
    return this.categoriaRepository.ingresoCategoria(id).create(ingreso);
  }

  @patch('/categorias/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Categoria.Ingreso PATCH success count',
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
    return this.categoriaRepository.ingresoCategoria(id).patch(ingreso, where);
  }

  @del('/categorias/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Categoria.Ingreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.categoriaRepository.ingresoCategoria(id).delete(where);
  }
}
