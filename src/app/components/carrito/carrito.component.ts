import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoDTO } from 'src/app/dtos/carrito-dto';
import { LibroDTO } from 'src/app/dtos/libro-dto';
import { PedidoDTO } from 'src/app/dtos/pedido-dto';
import { PedidoLibroDTO } from 'src/app/dtos/pedido-libro-dto';
import { UsuarioDTO } from 'src/app/dtos/usuario-dto';
import { LibrosService } from 'src/app/services/libros.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito.service';
import { ItemCarritoDTO } from 'src/app/dtos/item-carrito-dto';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: PedidoDTO = new PedidoDTO;
  _subscriptionToCarrito = null;

  constructor(private usuariosService: UsuariosService,
    private tokenStorageService: TokenStorageService,
    private librosService: LibrosService,
    private pedidosService: PedidosService,
    private carritoService: CarritoService,
    private router: Router) { }

  ngOnInit(): void {

    let idUsuario = this.tokenStorageService.getUsuario().id;

    this._subscriptionToCarrito = this.carritoService.carritoChanges.subscribe((value) => {
      this.obtenerCarrito(idUsuario);
    });

    this.obtenerCarrito(idUsuario);
  }

  async obtenerCarrito(idUsuario: number) {

    this.pedido.enviado = false;
    this.pedido.fecha = new Date();
    
    const user = new UsuarioDTO();
    user.id = idUsuario;

    this.pedido.usuario = user;
    this.pedido.precioTotal = 0;
    this.pedido.lineas = [];

    for(const lineaCarrito of this.carritoService.getCarrito().lineasCarrito) {

      const linea = new PedidoLibroDTO();
      linea.cantidad = lineaCarrito.cantidad;
      linea.libro = await this.librosService.obtenerLibro(lineaCarrito.idLibro).toPromise();
      linea.precio = linea.libro.precio;
      this.pedido.precioTotal = this.pedido.precioTotal + (linea.cantidad * linea.precio);
      this.pedido.lineas.push(linea);
    }

  }

  realizarPedido() {
    let idUsuario = this.tokenStorageService.getUsuario().id;

    this.pedidosService.crearPedido(this.pedido)
      .subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'nuevo pedido creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.carritoService.obtenerCarrito(idUsuario);
        this.router.navigate(['/']);
    },
    err => {
      alert(err.error.message);
      console.log(err);
      console.log(err.error.message);
    });
  }

  borrarDelCarrito(idLibro: number) {
    let itemCarritoDTO: ItemCarritoDTO = new ItemCarritoDTO();
    itemCarritoDTO.idLibro = idLibro;
    itemCarritoDTO.cantidad = 0;
    let idUsuario = this.tokenStorageService.getUsuario().id;
    this.carritoService.agregarLineaAlCarrito(idUsuario, itemCarritoDTO);
  }
 

}
