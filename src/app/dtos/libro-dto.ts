import { AutorDTO } from '../dtos/autor-dto';
import { EditorialDTO } from '../dtos/editorial-dto';

export class LibroDTO {

    id: number;
    titulo: string;
    autor: AutorDTO;
    editorial: EditorialDTO;
    identificadorImagen: String;
    precio: number;

}