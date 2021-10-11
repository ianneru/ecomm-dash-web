import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablePaginateComponent } from './table-paginate/table-paginate.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthInterceptor } from './router/auth/auth.interceptor';
import { AuthJwtInterceptor } from './router/auth/auth-jwt.interceptor';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    TablePaginateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
