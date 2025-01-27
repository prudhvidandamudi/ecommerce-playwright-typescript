import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';
class BasePage {
    page;
    homeLink;
    productsLink;
    cartLink;
    signupLoginLink;
    contactUsLink;
    logoutLink;
    deleteAccountLink;
    constructor(page) {
        this.page = page;
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    }
    async visitAutomationPractice() {
        await this.page.goto('./');
        return this;
    }
    async loginPage() {
        await this.signupLoginLink.click();
        return new LoginPage(this.page);
    }
    async homePage() {
        await this.homeLink.click();
        return new HomePage(this.page);
    }
    async contactUsPage() {
        await this.contactUsLink.click();
        return new ContactUsPage(this.page);
    }
}
export default BasePage;
