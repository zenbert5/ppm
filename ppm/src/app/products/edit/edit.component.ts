import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    product: object = {
        title: '',
        price: 0,
        url: '',
    }
    flashMsg: object = {
        type: '',
        messages: []
    }

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.getProduct(params['id']);
            console.log(`edit call --> ${params['id']}`);
        })
    }

    getProduct(id: string) {
        let observable = this._httpService.fetchProduct(id);
        observable.subscribe(data => {
            console.log(`fetched data -> ${data}`);
            this.product = data;
        })
    }

    editProduct() {
        let observable = this._httpService.updateProduct(this.product);
        observable.subscribe(data => {
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
                this.flashMsg['messages'].push('Product editted successfully!');
                // cannot set flash to null -- cause angular to complaint of setting null to object type **
                setTimeout(() => {
                    this.flashMsg = { type: '', messages: []};
                    this._httpService.getAllProducts()
                }, 3000);
                this._router.navigate(['/products']);
            }
        })
    }

    deleteProduct() {
        let observable = this._httpService.delProduct(this.product['_id']);
        observable.subscribe(data => {
            this.flashMsg['type'] = 'success';
            this.flashMsg['messages'].push('Product deleted successfully!');
                // cannot set flash to null -- cause angular to complaint of setting null to object type **
            setTimeout(() => {
                this.flashMsg = { type: '', messages: []};
                this._httpService.getAllProducts()
            }, 3000);
        })
    }
}
