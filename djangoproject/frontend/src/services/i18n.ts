import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    header: {
                        home: "Home",
                        internal: "Internal Migration",
                        external: "External Migration",
                        login: 'Log in',
                        signup: 'Sign up',
                        logout: 'Logout',
                        hello: 'Hi, '
                    },
                    home: {
                        s1: {
                            h1: 'Predict Human Migration Patterns',
                            p: 'Leverage our advanced system to forecast migration trends and make informed decisions.',
                            button: 'Get Started'
                        },
                        s2: {
                            h1: 'Key Features',
                            f1h: 'Data Analysis',
                            f1c: 'Analyze vast amounts of data to identify migration patterns and trends.',
                            f2h: 'Predictive Models',
                            f2c: 'Utilize advanced machine learning algorithms to predict future migration movements.',
                            f3h: 'Visualization',
                            f3c: 'Visualize migration data and patterns through interactive maps.',
                            f4h: 'Real-Time Updates',
                            f4c: 'Receive real-time updates on migration trends and changes in movement patterns.',
                        },
                        s3: {
                            h2: 'Ready to Get Started?',
                            p: 'Join our platform today and make data-driven decisions.',
                            button: 'Sign Up Now'
                        }
                    },
                    internal: {
                        migration: "Migration",
                        immigration: "Immigration",
                        predict: "Predict"
                    }
                }
            },
            uk: {
                translation: {
                    header: {
                        home: "Головна",
                        internal: "Внутрішня Міграція",
                        external: "Зовнішня Міграція",
                        login: 'Увійти',
                        signup: 'Зареєструватися',
                        logout: 'Вийти',
                        hello: 'Привіт, '
                    },
                    home: {
                        s1: {
                            h1: 'Прогнозуйте Тенденції Людської Міграції',
                            p: 'Використовуйте нашу сучасну систему для прогнозування міграційних тенденцій та прийняття обґрунтованих рішень.',
                            button: 'Розпочати'
                        },
                        s2: {
                            h1: 'Особливості',
                            f1h: 'Аналіз даних',
                            f1c: 'Аналізуйте величезні обсяги даних для виявлення міграційних закономірностей і тенденцій.',
                            f2h: 'Моделі прогнозування',
                            f2c: 'Використовувати сучасні алгоритми машинного навчання для прогнозування майбутніх міграційних переміщень.',
                            f3h: 'Візуалізація',
                            f3c: 'Візуалізуйте дані та моделі міграції за допомогою інтерактивних карт.',
                            f4h: 'Оновлення в режимі реального часу',
                            f4c: 'Отримуйте в режимі реального часу оновлення про міграційні тенденції та зміни в структурі пересування.',
                        },
                        s3: {
                            h2: 'Готові Розпочати?',
                            p: 'Приєднуйтесь до нашої платформи вже сьогодні та приймайте рішення на основі даних.',
                            button: 'Зареєструватися'
                        }
                    },
                    internal: {
                        migration: "Міграція",
                        immigration: "Імміграція",
                        predict: "Прогнозувати"
                    }
                }
            }
        }
    });

export default i18n;
