import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: string = null;
    private _isSuperUser: boolean = false;
    private _role: string = null;
    private _ProductId: any = null;
    private _customer: any = null;
    private _payment: any = null
    public currentProductId: any;
    public CurrentCustomerId: any;
    private _Users: any = null;
    public UserId: any;

    constructor() {
        this.load();
    }
    load = () => {
        if (this.isValid()) {
            const user = localStorage.getItem('userId');
            if (user) {
                this._user = user;
            }
            const iSuperUser = localStorage.getItem('isSuperUser');
            if (iSuperUser) {
                this._isSuperUser = iSuperUser === 'true';
            }
        }
    }

    isValid = () => {
        const user = localStorage.getItem('userName');
        if (!user) {
            return false;
        }
        return true;
    }

    get User(): string {
        return this._user;
    }
    set User(user: string) {
        localStorage.setItem('userName', user);
        this._user = user;
    }
    get IsSuperUser(): boolean {
        return this._isSuperUser;
    }
    set IsSuperUser(flag: boolean) {
        localStorage.setItem('isSuperUser', flag + '');
        this._isSuperUser = flag;
    }
    get Role(): string {
        return this._role;
    }
    set Role(role: string) {
        localStorage.setItem('Role', role);
        this._role = role;
    }
    get Users(): any {
        return this._Users;
    }
    set Users(user: any) {
        localStorage.setItem('userId', user);
        this._Users = user;
    }
    reload() {
        window.location.reload();
    }
    get Product(): string {
        return this._ProductId;
    }
    set Product(user: string) {
        localStorage.setItem('productId', user);
        this._ProductId = user;
    }
    get customer(): string {
        return this._customer;
    }
    set customer(user: string) {
        localStorage.setItem('customerId', user);
        this._customer = user;
    }
    get PaymentId(): string {
        return this._payment;
    }
    set PaymentId(user: string) {
        localStorage.setItem('productCustomerId', user);
        this._payment = user;
    }
    setProductId(params: any) {
        this.currentProductId = params;
    }
    getProductId(): string {
        return this.currentProductId;
    }
    setCustomerId(params: any) {
        this.CurrentCustomerId = params;
    }
    getCustomerId(): string {
        return this.CurrentCustomerId;
    }
    setUserId(params: any) {
        this.UserId = params;
    }
    getUserId(): string {
        return this.UserId;
    }
}