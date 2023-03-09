import { Injectable } from '@angular/core';

export interface Offer {
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;
}

const PRODUCT_OFFERING = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard',
    role: '',
  },
  {
    state: 'category',
    name: 'Manage Category',
    type: 'link',
    icon: 'category',
    role: 'admin',
  },
];

@Injectable()
export class ProductOffering {
  getProductOffering(): Offer[] {
    return PRODUCT_OFFERING;
  }
}
