import Section from "../ui/Section.tsx";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {useAuth} from "../../hooks/useAuth.ts";

const Home = () => {
    const { t } = useTranslation();
    const {user} = useAuth()

    return(
        <div>
            <Section>
                <section className="py-20">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl dark:text-white font-bold mb-4">{t('home.s1.h1')}</h1>
                        <p className="dark:text-white text-lg">{t('home.s1.p')}</p>
                        <Link to="/migration/internal" className="mt-8 inline-block bg-blue-100 dark:bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full py-3 px-6 font-bold">{t('home.s1.button')}</Link>
                    </div>
                </section>
            </Section>
            <Section>
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl text-center dark:text-white font-bold mb-8">{t('home.s2.h1')}</h2>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">{t('home.s2.f1h')}</h3>
                                    <p className="text-gray-700">{t('home.s2.f1c')}</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">{t('home.s2.f2h')}</h3>
                                    <p className="text-gray-700">{t('home.s2.f2c')}</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">{t('home.s2.f3h')}</h3>
                                    <p className="text-gray-700">{t('home.s2.f3c')}</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">{t('home.s2.f4h')}</h3>
                                    <p className="text-gray-700">{t('home.s2.f4c')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Section>
            {
                user ?
                    <></>
                    :
                    <Section>
                        <section className="py-16">
                            <div className="container mx-auto text-center">
                                <h2 className="text-3xl dark:text-white font-bold mb-4">{t('home.s3.h2')}</h2>
                                <p className="dark:text-white text-lg mb-8">{t('home.s3.p')}</p>
                                <Link to="/register"
                                      className="inline-block bg-blue-100 dark:bg-white text-blue-500 hover:bg-blue-600 hover:text-white rounded-full py-3 px-8 font-bold">{t('home.s3.button')}</Link>
                            </div>
                        </section>
                    </Section>
            }
        </div>
    )
}

export default Home