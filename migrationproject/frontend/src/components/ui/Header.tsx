import {Link, NavLink, useNavigate} from "react-router-dom";
import {AuthService} from "../../services/auth.service.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const lngs = {
    en: { nativeName: 'ENG' },
    uk: { nativeName: 'УКР' }
};

const Header = () => {

    const {user, setUser} = useAuth()
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()

    const logout = () => {
        AuthService.logout()
        toast.success('Logout success!')
        setUser(null)
        navigate("/")
    }

    return(
        <header>
            <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap lg:flex-nowrap justify-between items-center mx-auto max-w-screen-xl lg:py-1">
                    <Link to="/" className="flex items-center">
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MiFlow</span>
                    </Link>
                    <div className="flex items-center lg:order-0">
                        <button data-collapse-toggle="mobile-menu-2" type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-full lg:order-1"
                         id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:mx-auto">
                            <li>
                                <NavLink to="/" className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? "text-black dark:text-white": "text-gray-700 dark:text-gray-400"}`}
                                >{t('header.home')}</NavLink>
                            </li>
                            <li>
                                <NavLink  to="/migration/internal" className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-400"}`}
                                >{t('header.internal')}</NavLink>
                            </li>
                            <li>
                                <NavLink  to="/migration/external" className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-400"}`}
                                >{t('header.external')}</NavLink>
                            </li>
                            <li className="flex py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                            {Object.keys(lngs).map((lng, index) => (
                                <div key={index}>
                                    {index == 0 ? <></> : <span className="dark:text-white">/</span>}
                                    <button className={`dark:text-white ${i18n.resolvedLanguage === lng ? "font-bold" : "font-normal"}`} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                                        {lngs[lng as keyof typeof lngs].nativeName}
                                    </button>
                                </div>
                            ))}
                            </li>
                        </ul>
                        <div className="mt-2 lg:mt-0">
                        {
                            user ?
                                <>
                                    <button
                                        className="text-gray-800 dark:text-white hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={logout}>{t('header.logout')}</button>
                                    {
                                        user.is_superuser ?
                                            <Link to="/migration/admin"
                                                  className="text-white hover:bg-blue-600 bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-primary-500 dark:bg-primary-600 focus:outline-none dark:focus:ring-primary-800">{t('header.admin')}</Link>
                                            :
                                            <Link to="/migration/user"
                                                  className="text-white hover:bg-blue-600 bg-blue-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-primary-500 dark:bg-primary-600 focus:outline-none dark:focus:ring-primary-800">{t('header.hello')}{user.name}</Link>
                                    }
                                </>
                                :
                                <>
                                    <Link to="/login"
                                          className="text-gray-800 dark:text-white hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">{t('header.login')}</Link>
                                    <Link to="/register"
                                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-24 text-center truncate md:w-auto">{t('header.signup')}</Link>
                                </>
                        }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header