import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // tag::home-route[]
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
  // end::home-route[]
  {path: 'chat-room', loadChildren: () => import('./pages/chat-room/chat-room.module').then(m => m.ChatRoomPageModule)},
  {
    path: 'select-room',
    loadChildren: () => import('./pages/select-room/select-room.module').then(m => m.SelectRoomPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
