import { Component, OnInit, Input } from '@angular/core';
import { EditorialDTO } from 'src/app/dtos/editorial-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {EDITORIAL_CREAR, EDITORIAL_EDITAR } from '../../constantes';

@Component({
  selector: 'app-editorial-detalle',
  templateUrl: './editorial-detalle.component.html',
  styleUrls: ['./editorial-detalle.component.css']
})
export class EditorialDetalleComponent implements OnInit {

  @Input() editorial: EditorialDTO;
  id: number;
  esNuevoEditorial = false;
  esDetalleEditorial = false;
  mostrarBotonSubmit: boolean = false;
  textoBotonSubmit: string = "";

  

  constructor(
    private editorialesService: EditorialesService,
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
          this.esDetalleEditorial = true;
          this.obtenerEditorial();
          
          this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(EDITORIAL_EDITAR);
          this.textoBotonSubmit = "Actualizar editorial ";
        }
      }
      else {
        // nuevo
        console.log("No tengo ID");
        this.esNuevoEditorial = true;
        this.editorial = new EditorialDTO();

        this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(EDITORIAL_CREAR);
        this.textoBotonSubmit = "Dar de alta editorial";
      }

    });
  }

  private obtenerEditorial() {
    
    this.editorialesService.obtenerEditorial(this.id)
    .subscribe((res: EditorialDTO) => {
      this.editorial = res;
      console.log(this.editorial);
    },
    err => {
      alert(err.error.message);
      console.log(err);
    });
    
  }

  guardarEditorial() {
    
    if (this.esNuevoEditorial) {
      // llamar al alta pasandole el editorialDTO
      console.log("nueva alta");
      this.editorialesService.crearEditorial(this.editorial)
        .subscribe((res: any) => {
          alert('nuevo editorial creado correctamente');
          this.router.navigate(['/editoriales']);
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
      this.editorialesService.actualizarEditorial(this.editorial)
      .subscribe((res: any) => {
        alert('editorial actualizado correctamente');
        this.router.navigate(['/editoriales']);
      },
      err => {
        alert(err.error.message);
        console.log(err);
        console.log(err.error.message);
      });
    }
    
  }

}
