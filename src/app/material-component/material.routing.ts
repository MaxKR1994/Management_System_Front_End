import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


export const MaterialRoutes: Routes = [
    {
        path:'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    }
];
