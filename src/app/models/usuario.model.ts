export class UsuarioModel {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    active: boolean;
    telefono?: number;
    codigo?: string;
    fechaRecuperacion?: Date;

    constructor() {
        this.active = false;
    }

}
