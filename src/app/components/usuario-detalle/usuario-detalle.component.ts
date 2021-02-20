import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/dtos/usuario-dto';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { USUARIO_CREAR, USUARIO_EDITAR } from '../../constantes';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuario: UsuarioDTO;
  id: number;
  esDetalleUsuario = false;
  mostrarBotonSubmit: boolean = false;
  textoBotonSubmit: string = "";

 
  constructor(
    private usuariosService: UsuariosService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      
      if (params.id) {
        this.id = +params.id;
        if (isNaN(this.id)) {
          this.router.navigate(['/']);
        }
        else {
          // detalle
          this.esDetalleUsuario = true;
          this.obtenerUsuario();
          
          this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(USUARIO_EDITAR);
          this.textoBotonSubmit = "Actualizar Usuario";
        }
      }
    });
  }

  private obtenerUsuario() {
    
    this.usuariosService.obtenerUsuario(this.id)
    .subscribe((res: UsuarioDTO) => {
      this.usuario = res;
      console.log(this.usuario);
    },
    err => {
      alert(err.error.message);
      console.log(err);
      this.router.navigate(['/']);
    });
    
  }

  guardarUsuario() {
    
    // lamar a la actualizacion
    console.log("actualizacion");
    this.usuariosService.actualizarUsuario(this.usuario)
    .subscribe((res: any) => {
      alert('usuario actualizado correctamente');
      this.router.navigate(['/usuarios']);
    },
    err => {
      alert(err.error.message);
      console.log(err);
      console.log(err.error.message);
    });
    
  }
}