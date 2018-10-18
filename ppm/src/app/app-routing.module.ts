import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { EditComponent } from './products/edit/edit.component';
import { NewComponent } from './products/new/new.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent, children:[
        { path: 'new', component: NewComponent },
        { path: 'edit/:id', component: EditComponent }]},
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: '**', component: AppComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }