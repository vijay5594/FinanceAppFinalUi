import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthCookie {
    constructor(private cookieService: CookieService) { }

    getToken = (): string => {
        return this.cookieService.get('authenticationtoken');
    }

    setToken(value: string, expires: Date): void {
        this.cookieService.set('authenticationtoken', value, expires);
    }

    deleteToken(): void {
        this.cookieService.delete('authenticationtoken');
    }
}