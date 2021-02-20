import { HttpHeaders } from '@angular/common/http';

export const API_HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

export const API_URL = 'http://localhost:8080/api';
export const API_ENDPOINT_AUTENTICACION_URL = API_URL + '/autenticacion/login';
export const API_ENDPOINT_REGISTRO_URL = API_URL + '/autenticacion/registro';


export const AUTOR_LECTURA = "autor_lectura";
export const AUTOR_CREAR = "autor_crear";
export const AUTOR_EDITAR = "autor_editar";
export const AUTOR_BORRAR = "autor_borrar";

export const EDITORIAL_LECTURA = "editorial_lectura";
export const EDITORIAL_CREAR = "editorial_crear";
export const EDITORIAL_EDITAR = "editorial_editar";
export const EDITORIAL_BORRAR = "editorial_borrar";

export const LIBRO_LECTURA = "libro_lectura";
export const LIBRO_CREAR = "libro_crear";
export const LIBRO_EDITAR = "libro_editar";
export const LIBRO_BORRAR = "libro_borrar";

export const PEDIDO_LECTURA = "pedido_lectura";
export const PEDIDO_CREAR = "pedido_crear";
export const PEDIDO_EDITAR = "pedido_editar";
export const PEDIDO_BORRAR = "pedido_borrar";

export const USUARIO_LECTURA = "usuario_lectura";
export const USUARIO_CREAR = "usuario_crear";
export const USUARIO_EDITAR = "usuario_editar";
export const USUARIO_BORRAR = "usuario_borrar";