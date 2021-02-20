import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Si estamos logeados
    if (this.tokenStorageService.getUsuario()) {
      const funcionalidadesRequeridas: Array<string> = next.data.funcionalidadesRequeridas || [];
      const funcionlidadesDelUsuario = this.tokenStorageService.getFuncionalidades();

      // Comprobamos que el usuario tenga las funcionalidades requeridas, en cuanto una funcionalidad requerida no es
      // poseida por el usuario, navegamos al home y devolvemos false
      for (const funcionalidadRequeridad of funcionalidadesRequeridas) {
        if (!funcionlidadesDelUsuario.has(funcionalidadRequeridad)) {
          this.router.navigate(['']);
          return false;
        }
      }

      // Si llegamos a este true, es que el usuario cumple las funcionalidades requeridas.
      return true;
    }

    // Si no estamos logeados, redirigimos al login y devolvemos false
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
 
}
