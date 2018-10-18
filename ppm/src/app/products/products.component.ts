import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    flashMsg: object = {
        type: '',
        message: ''
    }
    constructor(
        private _httpService: HttpService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getProducts();
        this._route.params.subscribe((params: Params) => {
            console.log(`routes ${params}`)
        })
    }

    getProducts() {
        let observable = this._httpService.getAllProducts();
        observable.subscribe(data => {
            this._httpService.products = data;
            console.log('fetched all products -- angular side');
        })
    }

    deleteProduct(id: string) {
        let observable = this._httpService.delProduct(id);
        observable.subscribe(data => {
            console.log('Data from server --> ', data)
            if (data['name'] == 'ValidationError') {
                for (let key in data['errors']) {
                    this.flashMsg['messages'].push(data['errors'][key]['message']);
                }
                this.flashMsg['type'] = 'error'
                console.log(this.flashMsg);
                // cannot set flash to null -- cause angular to complaint of setting null to object type **
                setTimeout(() => { this.flashMsg = { type: '', messages: []}}, 3000);
            }
            else {
                this.flashMsg['type'] = 'success';
                this.flashMsg['messages'].push('Product deleted successfully!');
                // cannot set flash to null -- cause angular to complaint of setting null to object type **
                setTimeout(() => { this.flashMsg = { type: '', messages: []}}, 3000);
                this._router.navigate(['/products']);
            }
        })
    }
}
