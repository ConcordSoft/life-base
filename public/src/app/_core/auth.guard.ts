import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _sessionService: SessionService, private _router: Router){}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this._sessionService.isAuth()) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
  canActivateChild() {
    if (!this._sessionService.isAuth()) {
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }
}
