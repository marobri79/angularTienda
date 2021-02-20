import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AutenticacionService} from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  estoyLogado = false;
  loginFallido = false;
  mensajeError = '';
  funcionalidades: Set<string>;
  username: string;
  password: string;

  constructor(
    private autenticacionService: AutenticacionService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.estoyLogado = true;
      this.funcionalidades = this.tokenStorageService.getFuncionalidades();
      this.username = this.tokenStorageService.getUsuario().nombreUsuario;
      this.redireccionarHaciaProximaURL();
    }
  }
  
  redireccionarHaciaProximaURL() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // Usamos este location href en vez de router navigate, porque queremos fozar la carga entera.
    location.href = returnUrl;
  }

  onSubmit() {
    this.autenticacionService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.guardarToken(data.token);
        this.tokenStorageService.guardarUsuarioDesdeToken(data.token);

        this.loginFallido = false;
        this.estoyLogado = true;
        this.funcionalidades = this.tokenStorageService.getUsuario().funcionalidades;
        this.username = this.tokenStorageService.getUsuario().nombreUsuario;
        this.redireccionarHaciaProximaURL();
      },
      err => {
        this.mensajeError = err.error.mensaje;
        this.loginFallido = true;
      }
    );
  }



}
