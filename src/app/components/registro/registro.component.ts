import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/dtos/usuario-dto';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioDTO = new UsuarioDTO();
  submitted: boolean = false;
  registroFallido: boolean = false;
  mensajeError: string = "";

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("onSubmit");
    console.log("usuario");
    console.log(this.usuario);
    this.autenticacionService.registro(this.usuario).subscribe(
      data => {
        console.log("Data!!!");
        console.log(data);
        this.mensajeError = "";
        this.registroFallido = false;
        this.router.navigate(['/']);
      },
      err => {
        console.log("Err!!!");
        this.mensajeError = err.error.mensaje;
        this.registroFallido = true;
      },
    );
    this.submitted = true;
  }

}
