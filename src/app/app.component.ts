import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { UsuariosService } from './services/usuarios.service';
import { USUARIO_LECTURA, LIBRO_LECTURA, EDITORIAL_LECTURA, AUTOR_LECTURA, PEDIDO_LECTURA, USUARIO_CREAR } from './constantes';
import { CarritoDTO } from './dtos/carrito-dto';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda-angular';
  estoyLogado: boolean = false;
  nombreUsuario: string;
  private funcionalidades: Set<string>;

  puedoMostrarSeccionUsuarios: boolean = false;
  puedoMostrarSeccionLibros: boolean = false;
  puedoMostrarSeccionEditoriales: boolean = false;
  puedoMostrarSeccionAutores: boolean = false;
  puedoMostrarSeccionPedidos: boolean = false;

  carrito: CarritoDTO = null;
  _subscriptionToCarrito = null;

  textoPrincipal: string = "Tienda";

  constructor(
    private tokenStorageService: TokenStorageService,
    private usuariosService: UsuariosService,
    private carritoService: CarritoService,
    private router: Router
  ) {
    this._subscriptionToCarrito = this.carritoService.carritoChanges.subscribe((value) => {
      console.log(value);
      this.carrito = this.carritoService.getCarrito();
    });
  }

  ngOnInit() {
    this.estoyLogado = !!this.tokenStorageService.getToken();

    if (this.estoyLogado) {
      const user = this.tokenStorageService.getUsuario();
      this.carritoService.obtenerCarrito(user.id);
      this.carrito = this.carritoService.getCarrito();
      this.nombreUsuario = user.nombreUsuario;
      this.funcionalidades = this.tokenStorageService.getFuncionalidades();

      this.puedoMostrarSeccionUsuarios = this.funcionalidades.has(USUARIO_LECTURA);
      this.puedoMostrarSeccionLibros = this.funcionalidades.has(LIBRO_LECTURA);
      this.puedoMostrarSeccionEditoriales = this.funcionalidades.has(EDITORIAL_LECTURA);
      this.puedoMostrarSeccionAutores = this.funcionalidades.has(AUTOR_LECTURA);
      this.puedoMostrarSeccionPedidos = true;

      if (this.funcionalidades.has(USUARIO_CREAR)) {
        this.textoPrincipal = "Programa de gestion";
      }
      else {
        this.textoPrincipal = "Tienda";
      }
    }
    else {
      this.carrito = null;
      this.textoPrincipal = "Tienda";
    }
  }

  private getIdUsuarioConectado() {
    const user = this.tokenStorageService.getUsuario();
    return user.id;
  }

  logout() {
    this.tokenStorageService.logout();
    location.href = "/";
  }

  ngOnDestroy() {
    this._subscriptionToCarrito.unsubscribe();
  }

}
