import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private LoginApi = 'Login';
    private ProductApi = 'Product';
    private CustomerApi = 'Customer';
    private FileApi = 'Fileupload';
    private ProductCustomerApi = 'ProductCustomer';
    private PaymentApi = 'Payment';

    constructor(private http: HttpClient) {
    }

    logout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('isSuperUser');
        localStorage.removeItem('Role');
        localStorage.removeItem('productId');
        localStorage.removeItem('customerId');
        localStorage.removeItem('productCustomerId');
        localStorage.removeItem('userId');
    }
    loginApiUrl = (endpoint: string) => {
        return `${environment.baseURL}/${this.LoginApi}/${endpoint}`;
    }
    getProductApiUrl = (endpoint: string) => {
        return `${environment.baseURL}/${this.ProductApi}/${endpoint}`;
    }
    getCustomerApiUrl = (endpoint: string) => {
        return `${environment.baseURL}/${this.CustomerApi}/${endpoint}`;
    }
    FileApiUrl = (endpoint: string) => {
        return `${environment.baseURL}/${this.FileApi}/${endpoint}`;
    }
    getProductCustomerApiUrl = (endpoint: string) => {
        return `${environment.baseURL}/${this.ProductCustomerApi}/${endpoint}`;
    }
    getPaymentApiUrl = (endpoint: string) => {
        return `${environment.baseURL}/${this.PaymentApi}/${endpoint}`;
    }

    doLogin = (params: any): Observable<any> => {
        const url = this.loginApiUrl('GetLogin');
        return this.http.post(url, params);
    }
    GetUser = (params: any): Observable<any> => {
        const url = this.loginApiUrl('GetUser?data=');
        return this.http.get(url + params);
    }
    addUser = (params: any): Observable<any> => {
        const url = this.loginApiUrl('AddUser');
        return this.http.post(url, params);
    }
    getAllUserDetails() {
        const url = this.loginApiUrl('GetAllUsers')
        return this.http.get(url);
    }
    updateUser = (params: any): Observable<any> => {
        const url = this.loginApiUrl('UpdateUser');
        return this.http.put(url, params);
    }
    deleteUser = (params: any): Observable<any> => {
        const url = this.loginApiUrl('DeleteUser?id=' + params);
        return this.http.delete(url);
    }
    CheckUser = (params: any): Observable<any> => {
        const url = this.loginApiUrl('CheckUser?id=' + params);
        return this.http.get(url);
    }
    existUserName(exist: any) {
        const url = this.loginApiUrl('UserExist?obj=')
        return this.http.get(url + exist);
    }
    insertProduct = (params: any): Observable<any> => {
        const url = this.getProductApiUrl('AddNewProduct');
        return this.http.post(url, params);
    }
    getProductDetails() {
        const url = this.getProductApiUrl('GetProductDetails')
        return this.http.get(url);
    }
    existProductName(exist: any) {
        const url = this.getProductApiUrl('productNameExist?obj=')
        return this.http.get(url + exist);
    }
    updateProduct = (params: any): Observable<any> => {
        const url = this.getProductApiUrl('UpdateProduct');
        return this.http.put(url, params);
    }
    getProductDetailsById(params: any): Observable<any> {
        const url = this.getProductApiUrl('ProductId?id=');
        return this.http.get(url + params);
    }

    CustomerPagination(params: any) {
        const url = this.getCustomerApiUrl('CustomerPagination?PageNumber=' + params + '&PageSize=20');
        return this.http.get(url);
    }

    FilterCustomerSearch(params2: any) {
        const url = this.getCustomerApiUrl('CustomerPagination?PageSize=100&QuerySearch=' + params2);
        return this.http.get(url);
    }
    existMobileNumber(exist: any) {
        const url = this.getCustomerApiUrl('existMobileNumber?obj=')
        return this.http.get(url + exist);
    }
    existAdharNumber(exist: any) {
        const url = this.getCustomerApiUrl('existAadharNumber?obj=')
        return this.http.get(url + exist);
    }
    insertCustomer = (params: any): Observable<any> => {
        const url = this.getCustomerApiUrl('AddNewCustomer');
        return this.http.post(url, params);
    }
    updateCustomer = (params: any): Observable<any> => {
        const url = this.getCustomerApiUrl('UpdateCustomer');
        return this.http.put(url, params);
    }
    fileUpload = (params: any): Observable<any> => {
        const url = this.FileApiUrl('Upload');
        return this.http.post(url, params);
    }

    insertProductCustomer = (params: any): Observable<any> => {
        const url = this.getProductCustomerApiUrl('AddProductCustomerdetails');
        return this.http.post(url, params);
    }
    CustomerForProductDetails = (id: any): Observable<any> => {
        const url = this.getProductCustomerApiUrl('FliterCustomerDetailsForProduct?id=');
        return this.http.get(url + id);
    }
    productForCustomerDetails = (id: any): Observable<any> => {
        const url = this.getProductCustomerApiUrl('FliterProductForCustomer?id=');
        return this.http.get(url + id);
    }
    ProductCustomer = (id: any): Observable<any> => {
        const url = this.getProductCustomerApiUrl('OrderByProduct?ProductId=');
        return this.http.get(url + id);
    }
    getProductCustomer = (): Observable<any> => {
        const url = this.getProductCustomerApiUrl('AllproductCustomer');
        return this.http.get(url);
    }
    CustomerPayHistory = (id: any): Observable<any> => {
        const url = this.getPaymentApiUrl('CustomerPayHistory?id=');
        return this.http.get(url + id);
    }
    paymentDetails = (params: any): Observable<any> => {
        const url = this.getPaymentApiUrl('PaymentDetails');
        return this.http.post(url, params);
    }

    getPayment = (id: any): Observable<any> => {
        const url = this.getPaymentApiUrl('getPaymentDetails?id=');
        return this.http.get(url + id);
    }
    filterItem = (params: any): Observable<any> => {
        const url = this.getPaymentApiUrl('FilteredItems');
        return this.http.post(url, params);
    }
    paymenthistory = (params: any): Observable<any> => {
        const url = this.getPaymentApiUrl('TotalAmount');
        return this.http.post(url, params);
    }

}