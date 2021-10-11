import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentViewer = this.authenticationService.currentViewerValue;
        if (currentViewer && currentViewer.viewer) {
            let roles = route.data && route.data.roles;
            if (!roles) {
                let t = route.firstChild; 
                while (t) {
                    roles = t.data && t.data.roles;
                    t = t.firstChild;                    
                }
            }

            if (roles && roles.indexOf(currentViewer.viewer.role) === -1) {
                this.router.navigate(['/']);
                return false;
            }

            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}