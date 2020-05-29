import {DefaultCrudRepository} from '@loopback/repository';
import {Ingreso, IngresoRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IngresoRepository extends DefaultCrudRepository<
  Ingreso,
  typeof Ingreso.prototype.id,
  IngresoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Ingreso, dataSource);
  }
}
