import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact/contact.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help-center/help/help.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'help', component: HelpComponent},
  { path: 'details', component: ProductDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
