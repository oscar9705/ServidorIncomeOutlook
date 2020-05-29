import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Ingreso} from '../models';
import {IngresoRepository} from '../repositories';

export class IngresoController {
  constructor(
    @repository(IngresoRepository)
    public ingresoRepository: IngresoRepository,
  ) {}

  @post('/ingresos/add', {
    responses: {
      '200': {
        description: 'Ingreso model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingreso)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {
            title: 'NewIngreso',
            exclude: ['id'],
          }),
        },
      },
    })
    ingreso: Omit<Ingreso, 'id'>,
  ): Promise<Ingreso> {
    return this.ingresoRepository.create(ingreso);
  }

  @get('/ingresos/count', {
    responses: {
      '200': {
        description: 'Ingreso model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ingreso) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.ingresoRepository.count(where);
  }

  @get('/ingresos/todos', {
    responses: {
      '200': {
        description: 'Array of Ingreso model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ingreso, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ingreso) filter?: Filter<Ingreso>,
  ): Promise<Ingreso[]> {
    return this.ingresoRepository.find(filter);
  }

  @patch('/ingresos', {
    responses: {
      '200': {
        description: 'Ingreso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {partial: true}),
        },
      },
    })
    ingreso: Ingreso,
    @param.where(Ingreso) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.ingresoRepository.updateAll(ingreso, where);
  }

  @get('/ingresos/{id}', {
    responses: {
      '200': {
        description: 'Ingreso model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ingreso, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ingreso, {exclude: 'where'}) filter?: FilterExcludingWhere<Ingreso>
  ): Promise<Ingreso> {
    return this.ingresoRepository.findById(id, filter);
  }


  @patch('/ingresos/{id}', {
    responses: {
      '204': {
        description: 'Ingreso PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {partial: true}),
        },
      },
    })
    ingreso: Ingreso,
  ): Promise<void> {
    await this.ingresoRepository.updateById(id, ingreso);
  }

  @put('/ingresos/{id}', {
    responses: {
      '204': {
        description: 'Ingreso PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ingreso: Ingreso,
  ): Promise<void> {
    await this.ingresoRepository.replaceById(id, ingreso);
  }

  @del('/ingresos/{id}', {
    responses: {
      '204': {
        description: 'Ingreso DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ingresoRepository.deleteById(id);
  }
}
