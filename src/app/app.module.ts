import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RoutingService } from './routing.service';
import { HttpService } from './http.service';
import { LoginCheckService } from './login-check.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DrawComponent } from './draw/draw.component';
import { CanvasComponent } from './canvas/canvas.component';
import { MessagingService } from './messaging.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from './data.service';
import { CapitalizefirstPipe } from './capitalizefirst.pipe';
import { GuessingComponent } from './guessing/guessing.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DrawComponent,
    CanvasComponent,
    CapitalizefirstPipe,
    GuessingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [HttpService, RoutingService, LoginCheckService, MessagingService, DataService ],
  bootstrap: [AppComponent]
})

export class AppModule {}
