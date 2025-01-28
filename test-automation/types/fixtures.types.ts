import {
  ContactUsPage,
  HomePage,
  LoginPage,
  RegisterFormPage,
} from '@pages/index';
import { UserData } from '@customTypes/index';

export interface PageFixtures {
  loginPage: LoginPage;
  registerFormPage: RegisterFormPage;
  contactUsPage: ContactUsPage;
  homePage: HomePage;
}

export interface TestFixtures {
  testUser: UserData; // UserData is your user type
}
