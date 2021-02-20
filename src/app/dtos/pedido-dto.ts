import { UsuarioDTO } from '../dtos/usuario-dto';
import { PedidoLibroDTO } from '../dtos/pedido-libro-dto';

export class PedidoDTO {

    id: number;
    fecha: Date;
    enviado: boolean;
    precioTotal: number;
    usuario: UsuarioDTO;
    lineas: PedidoLibroDTO[];

}