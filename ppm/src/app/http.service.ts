import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    products: object;
    product: object = {
        title: '',
        price: 0,
        url: ''
    }
    constructor(private _http: HttpClient) { }

    getAllProducts() {
        return this._http.get('/allProducts');
    }

    createProduct(product: object) {
        return this._http.post('/addProduct', product);
    }

    fetchProduct(id: string) {
        return this._http.get(`/fetchProduct/${id}`);
    }

    updateProduct(product: object) {
        return this._http.put('/updateProduct', product);
    }

    delProduct(id: string) {
        return this._http.delete('/destroy/:id');
    }
}
