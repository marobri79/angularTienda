import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { LibrosComponent } from './components/libros/libros.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';

import { AutenticacionGuard } from './guards/autenticacion.guard';
import { AUTOR_LECTURA,AUTOR_CREAR, LIBRO_CREAR, LIBRO_LECTURA, USUARIO_LECTURA,USUARIO_CREAR  } from './constantes';
import { EDITORIAL_LECTURA,EDITORIAL_CREAR } from './constantes';
import { AutoresComponent } from './components/autores/autores.component';
import { AutorDetalleComponent } from './components/autor-detalle/autor-detalle.component';
import { EditorialDetalleComponent } from './components/editorial-detalle/editorial-detalle.component';
import { EditorialesComponent } from './components/editoriales/editoriales.component';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidoDetalleComponent } from './components/pedido-detalle/pedido-detalle.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'libros',
    component: LibrosComponent,
    data: { funcionalidadesRequeridas: [ LIBRO_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'libros/nuevo',
    component: LibroDetalleComponent,
    data: { funcionalidadesRequeridas: [ LIBRO_CREAR ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'libros/:id', component: LibroDetalleComponent,
    data: { funcionalidadesRequeridas: [ LIBRO_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'autores',
    component: AutoresComponent,
    data: { funcionalidadesRequeridas: [ AUTOR_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
 
  {
    path: 'autores/nuevo',
    component: AutorDetalleComponent,
    data: { funcionalidadesRequeridas: [ AUTOR_CREAR ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'autores/:id',
    component: AutorDetalleComponent,
    data: { funcionalidadesRequeridas: [ AUTOR_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'editoriales',
    component: EditorialesComponent,
    data: { funcionalidadesRequeridas: [ EDITORIAL_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
 
  {
    path: 'editoriales/nuevo',
    component: EditorialDetalleComponent,
    data: { funcionalidadesRequeridas: [ EDITORIAL_CREAR ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'editoriales/:id', component: EditorialDetalleComponent,
    data: { funcionalidadesRequeridas: [ EDITORIAL_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { funcionalidadesRequeridas: [ USUARIO_LECTURA ] },
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'usuarios/:id', component: UsuarioDetalleComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'carrito', component: CarritoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'pedidos', component: PedidosComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'pedidos/:id', component: PedidoDetalleComponent,
    canActivate: [AutenticacionGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
