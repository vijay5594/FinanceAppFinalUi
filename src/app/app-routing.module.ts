import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [AuthGuardService]
    },

    {
        path: 'tab6',
        loadChildren: () => import('./layout/tab6/tab6.module').then(m => m.Tab6PageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'tab7',
        loadChildren: () => import('./layout/tab7/tab7.module').then(m => m.Tab7PageModule)
    },
    {
        path: 'tab5',
        loadChildren: () => import('./layout/tab5/tab5.module').then(m => m.Tab5PageModule)
        }
    


];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
