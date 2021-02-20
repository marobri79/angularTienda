import { Component, OnInit, Input } from '@angular/core';
import { LibroDTO } from 'src/app/dtos/libro-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from 'src/app/services/libros.service';
import { AutoresService } from 'src/app/services/autores.service';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { AutorDTO } from 'src/app/dtos/autor-dto';
import { EditorialDTO } from 'src/app/dtos/editorial-dto';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LIBRO_CREAR, LIBRO_EDITAR } from '../../constantes';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit {

  @Input() libro: LibroDTO;
  id: number;
  esNuevoLibro = false;
  esDetalleLibro = false;
  autores: AutorDTO[];
  editoriales: EditorialDTO[];
  mostrarBotonSubmit: boolean = false;
  textoBotonSubmit: string = "";

  constructor(
    private librosService: LibrosService,
    private autoresService: AutoresService,
    private editorialesService: EditorialesService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      
      this.obtenerAutores();
      this.obtenerEditoriales();

      if (params.id) {
        // el + lo que hace en este caso es castear a numero.
        this.id = +params.id;
        if (isNaN(this.id)) {
          this.router.navigate(['/']);
        }
        else {
          // detalle
          this.esDetalleLibro = true;
          this.obtenerLibro();
          
          this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(LIBRO_EDITAR);
          this.textoBotonSubmit = "Actualizar Libro";
        }
      }
      else {
        // nuevo
        console.log("No tengo ID");
        this.esNuevoLibro = true;
        this.libro = new LibroDTO();

        this.mostrarBotonSubmit = this.tokenStorageService.getFuncionalidades().has(LIBRO_CREAR);
        this.textoBotonSubmit = "Dar de alta Libro";
      }

    });
  }

  private obtenerLibro() {
    this.librosService.obtenerLibro(this.id)
    .subscribe((res: LibroDTO) => {
      this.libro = res;
      console.log(this.libro);
    },
    err => {
      alert(err.error.message);
      console.log(err);
    });
  }

  guardarLibro() {
    if (this.esNuevoLibro) {
      // llamar al alta pasandole el libroDTO
      console.log("nueva alta");
      this.librosService.crearLibro(this.libro)
        .subscribe((res: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'nuevo libro creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/libros']);
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
      this.librosService.actualizarLibro(this.libro)
      .subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'libro actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/libros']);
      },
      err => {
        alert(err.error.message);
        console.log(err);
        console.log(err.error.message);
      });
    }
  }

  private obtenerAutores() {
    this.autoresService.obtenerAutores()
    .subscribe((res: AutorDTO[]) => {
      this.autores = res;
      console.log(this.autores);
    },
    err => {
      alert(err.error.message);
      console.log(err);
    });
  }

  obtenerEditoriales() {
    this.editorialesService.obtenerEditoriales()
    .subscribe((res: EditorialDTO[]) => {
      this.editoriales = res;
      console.log(this.editoriales);
    },
    err => {
      alert(err.error.message);
      console.log(err);
    });
  }

  byAutor(autorOne: AutorDTO, autorTwo: AutorDTO) {
    if (autorOne == null || autorTwo == null) {
      return false;
    }
    return autorOne.id === autorTwo.id;
  }

  byEditorial(editorialOne: EditorialDTO, editorialTwo: EditorialDTO) {
    if (editorialOne == null || editorialTwo == null) {
      return false;
    }
    return editorialOne.id === editorialTwo.id;
  }

  async handleFileInput(files: FileList) {
    var fileToUpload = files.item(0);
    var respuestaJson = await this.librosService.postFile(fileToUpload);
    var identificador: string = respuestaJson["identificador"];

    this.libro.identificadorImagen = identificador;
    console.log(identificador);
  }

  getUrlPhoto() {
    return `${environment.API_ENDPOINT}/imagenes/${this.libro.identificadorImagen}`;
  }

}
