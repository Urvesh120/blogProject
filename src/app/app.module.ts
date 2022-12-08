import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafePipe } from './services/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptorInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
