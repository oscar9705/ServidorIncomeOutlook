import {UserProfile, UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PasswordHasherBindings} from '../keys';
import {Usuario} from '../models';
import {Credentials, UsuarioRepository} from '../repositories/usuario.repository';
import {BcryptHasher} from './hash.password.bcrypt';

export class MyUserService implements UserService<Usuario, Credentials> {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) {}
  async verifyCredentials(credentials: Credentials): Promise<Usuario> {
    //
    const foundUser = await this.usuarioRepository.findOne({
      where: {
        email: credentials.email,
      },
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `user not found with this ${credentials.email}`,
      );
    }

    const passwordMatched = await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('password is not valid');
    }
    return foundUser;
  }

  convertToUserProfile(user: Usuario): UserProfile {
    let userName = '';
    if (user.nombre) {
      userName = user.nombre;
    }
    if (user.apellido) {
      userName = user.nombre
        ? `${user.nombre} ${user.apellido}`
        : user.apellido;
    }
    return {id: `${user.id}`, name: userName}
  }
}
