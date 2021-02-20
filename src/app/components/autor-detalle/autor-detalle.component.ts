import { Component, OnInit, Input } from '@angular/core';
import { AutorDTO } from 'src/app/dtos/autor-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoresService } from 'src/app/services/autores.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AUTOR_CREAR, AUTOR_EDITAR } from '../../constantes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-autor-detalle',
  templateUrl: './autor-detalle.component.html',
  styleUrls: ['./autor-detalle.component.css']
})
export class AutorDetalleComponent implements OnInit {

  @Input() autor: AutorDTO;
  id: number;
  esNuevoAutor = false;
  esDetalleAutor = false;
  mostrarBotonSubmit: boolean = false;
  textoBotonSubmit: string = "";

  

  constructor(
    private autoresService: AutoresService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      


      if (params.id) {
        // el + lo que hace en este caso es castear a numero.
        this.id = +params.id;
        if (isNaN(this.id)) {
          this.router.navigate(['/']);
        }
        else {
          // detalle
          this.esDetalleAutor = true;
          this.obtenerAutor();
          
          this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(AUTOR_EDITAR);
          this.textoBotonSubmit = "Actualizar Autor";
        }
      }
      else {
        // nuevo
        console.log("No tengo ID");
        this.esNuevoAutor = true;
        this.autor = new AutorDTO();

        this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(AUTOR_CREAR);
        this.textoBotonSubmit = "Dar de alta Autor";
      }

    });
  }

  private obtenerAutor() {
    
    this.autoresService.obtenerAutor(this.id)
    .subscribe((res: AutorDTO) => {
      this.autor = res;
      console.log(this.autor);
    },
    err => {
      alert(err.error.message);
      console.log(err);
    });
    
  }

  guardarAutor() {
    
    if (this.esNuevoAutor) {
      // llamar al alta pasandole el autorDTO
      console.log("nueva alta");
      this.autoresService.crearAutor(this.autor)
        .subscribe((res: any) => {
         // alert('nuevo autor creado correctamente');
        
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'nuevo autor creado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
          this.router.navigate(['/autores']);
        },
        err => {
          alert(err.error.message);
          console.log(err);
          console.log(err.error.message);
        });
    }
    else {
      // lamar a la actualizacion
      console.log("actualizacion");
      this.autoresService.actualizarAutor(this.autor)
      .subscribe((res: any) => {
        alert('autor actualizado correctamente');
        this.router.navigate(['/autores']);
      },
      err => {
        alert(err.error.message);
        console.log(err);
        console.log(err.error.message);
      });
    }
    
  }

}
