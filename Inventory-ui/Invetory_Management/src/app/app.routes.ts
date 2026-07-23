import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { Layouts } from './components/layouts/layouts';
import { Catagori } from './components/catagori/catagori';
import { Purches } from './components/purches/purches';
import { PurchesDetail } from './components/purches-detail/purches-detail';
import { Seles } from './components/seles/seles';
import { SelesDetails } from './components/seles-details/seles-details';
import { Supplier } from './components/supplier/supplier';
import { ProductComponent } from './components/products/products';
import { CustomerComponent } from './components/customer/customer';
import { DashboardComponent } from './components/dashboard/dashboard';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [

  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },

  
  { 
    path: 'login', 
    component: LoginComponent 
  },

 
  {
    path: '',
    component: Layouts,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UserList
      },
      {
        path: 'catagori',
        component: Catagori
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'products',
        component: ProductComponent
      },
      {
        path: 'purches',
        component: Purches
      },
      {
        path: 'purches-detail',
        component: PurchesDetail
      },
      {
        path: 'seles',
        component: Seles
      },
      {
        path: 'seles-details',
        component: SelesDetails
      },
      {
        path: 'supplier',
        component: Supplier
      }
    ]
  },

 
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];