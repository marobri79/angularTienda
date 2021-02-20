import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrosComponent } from './components/libros/libros.component';
import { HttpClientModule } from '@angular/common/http';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';

import { authInterceptorProviders } from './interceptors/autenticacion.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { EditorialesComponent } from './components/editoriales/editoriales.component';
import { EditorialDetalleComponent } from './components/editorial-detalle/editorial-detalle.component';
import { AutorDetalleComponent } from './components/autor-detalle/autor-detalle.component';
import { AutoresComponent } from './components/autores/autores.component';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { DataTablesModule } from 'angular-datatables';
import { CarritoComponent } from './components/carrito/carrito.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidoDetalleComponent } from './components/pedido-detalle/pedido-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    LibroDetalleComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    EditorialesComponent,
    EditorialDetalleComponent,
    AutorDetalleComponent,
    AutoresComponent,
    UsuarioDetalleComponent,
    CarritoComponent,
    UsuariosComponent,
    PedidosComponent,
    PedidoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
