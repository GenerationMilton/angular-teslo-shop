import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.services';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    //firstValueFrom -> sends and observable and obtains a resp like a promise
    const isAuthenticated = await firstValueFrom( authService.checkStatus())
   
    if(isAuthenticated){
        router.navigateByUrl('/');
        return false;
    }
    
    return true;
}