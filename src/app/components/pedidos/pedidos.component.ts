import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Subject } from 'rxjs';
import { PedidoDTO } from 'src/app/dtos/pedido-dto';
import Swal from 'sweetalert2';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PEDIDO_EDITAR } from 'src/app/constantes';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnDestroy, OnInit {

  pedidos: PedidoDTO[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<PedidoDTO[]> = new Subject();

  puedeEnviarPedido: boolean;

  constructor(
    private pedidosService: PedidosService,
    private tokenStorageService: TokenStorageService,
  ) { }

 
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      info: true,
      retrieve: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        }
      }
    };

    this.puedeEnviarPedido = this.tokenStorageService.getFuncionalidades().has(PEDIDO_EDITAR);

    this.recuperarPedidos();
  }

  private recuperarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe((res: any) => {
      this.pedidos = res;
      this.dtTrigger.next();
    }, err => {
      this.pedidos = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se produjo un error obtiendo los pedidos',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  private enviarPedido(pedidoId: number) {

    this.pedidosService.enviarPedido(pedidoId)
      .subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Pedido con id ${pedidoId} enviado correctamente.`,
          showConfirmButton: false,
          timer: 1500
        });
        
        location.href = "/pedidos";
      }, 
      err => {
          alert(err.error.message);
          console.log(err);
          console.log(err.error.message);
      });
  }

  private formatDate(strDate: string) {
    return new Date(strDate).toLocaleString();
  }
 
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
