export class IngresoModel {
    id: number;
    valor: number;
    descripcion: string;
    fecha: Date;
    categoria_id: number;
    usuario_id: number;
    ubicacion?: string;
    archivo?: string;
        constructor() {
            this.usuario_id = 1;
        }
}
