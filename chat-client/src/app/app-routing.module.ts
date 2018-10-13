import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // tag::home-route[]
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  // end::home-route[]
  { path: 'chat-room', loadChildren: './pages/chat-room/chat-room.module#ChatRoomPageModule' },
  { path: 'select-room', loadChildren: './pages/select-room/select-room.module#SelectRoomPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
