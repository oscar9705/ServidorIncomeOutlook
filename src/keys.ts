import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {Usuario} from './models';
import {Credentials} from './repositories/usuario.repository';
import {PasswordHasher} from './services/hash.password.bcrypt';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'income1outlook4457';
  export const TOKEN_EXPIRES_IN_VALUE = '4h';
}
export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expiresIn',
  );

  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.jwt.service',
  );
}

export namespace PasswordHasherBindings {

  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );


  export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, Usuario>>(
    'services.user.service',
  );
}
