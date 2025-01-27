class LoginPage {
    page;
    loginEmailAddressTextbox;
    passwordTextbox;
    loginButton;
    nameTextbox;
    signupEmailAddressTextbox;
    signupButton;
    constructor(page) {
        this.page = page;
        this.loginEmailAddressTextbox = page
            .getByRole('textbox', {
            name: 'Email address',
        })
            .nth(0);
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.nameTextbox = page.getByRole('textbox', { name: 'Name' });
        this.signupEmailAddressTextbox = page
            .getByRole('textbox', { name: 'Email address' })
            .nth(1);
        this.signupButton = page.getByRole('button', { name: 'Signup' });
    }
}
export default LoginPage;
