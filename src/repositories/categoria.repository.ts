import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Categoria, CategoriaRelations, Ingreso} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {IngresoRepository} from './ingreso.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly ingresoCategoria: HasManyRepositoryFactory<Ingreso, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('IngresoRepository') protected ingresoRepositoryGetter: Getter<IngresoRepository>,
  ) {
    super(Categoria, dataSource);
    this.ingresoCategoria = this.createHasManyRepositoryFactoryFor('ingresoCategoria', ingresoRepositoryGetter,);
    this.registerInclusionResolver('ingresoCategoria', this.ingresoCategoria.inclusionResolver);
  }
}
