import AboutContainer from "../containers/aboutContainer";
import CategoryContainer from "../containers/categoryContainer";
import ContactContainer from "../containers/contactContainer";
import HomeContainer from "../containers/homeContainer";
import LoginContainer from "../containers/loginContainer";
import Notfound from "../containers/notFound";
import SignupContainer from "../containers/signupContainer";

const HomePage = () => <HomeContainer/>
const NotFoundPage = () => <Notfound/>
const LoginPage = () => <LoginContainer/>
const SingupPage = () => <SignupContainer/>
const CategoryPage = () => <CategoryContainer/>
const AboutPage = () => <AboutContainer/>
const ContactPage = () => <ContactContainer/>
export{
    HomePage,
    NotFoundPage,
    LoginPage,
    SingupPage,
    CategoryPage,
    AboutPage,
    ContactPage
}