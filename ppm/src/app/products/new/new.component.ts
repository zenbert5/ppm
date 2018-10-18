import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
    product: object = {
        title: '',
        price: 0,
        url: ''
    }
    flashMsg: object = {
        type: '',
        messages: []
    }

    constructor(
        private _httpService: HttpService,
        private _router: Router
    ) { }
    ngOnInit() {
        this.product = {title: '', price: 0, url: ''};
    }
    addProduct() {
        // validate front-end
        let observable = this._httpService.createProduct(this.product);
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
                this.flashMsg['messages'].push('Product addded successfully!');
                // cannot set flash to null -- cause angular to complaint of setting null to object type **
                setTimeout(() => {
                    this.flashMsg = { type: '', messages: []};
                    this._httpService.getAllProducts()
                }, 3000);
                this._router.navigate(['/products']);
            }
        })
    }
}
