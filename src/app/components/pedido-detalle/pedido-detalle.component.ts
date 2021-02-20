import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoDTO } from 'src/app/dtos/pedido-dto';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  @Input() pedido: PedidoDTO;
  id: number;

  constructor(private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      // el + lo que hace en este caso es castear a numero.
      this.id = +params.id;
      if (isNaN(this.id)) {
        this.router.navigate(['/']);
      }
      else {
        this.obtenerPedido();
      }
    });
  }

  private obtenerPedido() {
    this.pedidosService.obtenerPedido(this.id)
    .subscribe((res: PedidoDTO) => {
      this.pedido = res;
      console.log(this.pedido);
    },
    err => {
      alert(err.error.message);
      console.log(err);
      this.router.navigate(['/']);
    });
  }

}
