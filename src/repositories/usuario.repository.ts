import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Ingreso, Categoria} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {IngresoRepository} from './ingreso.repository';
import {CategoriaRepository} from './categoria.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly ingresos: HasManyRepositoryFactory<Ingreso, typeof Usuario.prototype.id>;

  public readonly categorias: HasManyRepositoryFactory<Categoria, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('IngresoRepository') protected ingresoRepositoryGetter: Getter<IngresoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Usuario, dataSource);
    this.categorias = this.createHasManyRepositoryFactoryFor('categorias', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.ingresos = this.createHasManyRepositoryFactoryFor('ingresos', ingresoRepositoryGetter,);
    this.registerInclusionResolver('ingresos', this.ingresos.inclusionResolver);
  }
}
