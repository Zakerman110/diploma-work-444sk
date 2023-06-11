import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: import.meta.env.DEV,
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
                        hello: 'Hi, ',
                        admin: 'Admin panel'
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
                    },
                    login: {
                        login: 'Sign in to your account',
                        email: 'Your email',
                        password: 'Password',
                        button: 'Sign In',
                        signup: 'Don’t have an account yet?'
                    },
                    signup: {
                        create: 'Create your account',
                        name: 'Your name',
                        email: 'Your email',
                        password: 'Your password'
                    },
                    userMigration: {
                        newMigrationButton: 'Add new migration flow',
                        searchByDescription: 'Search by description',
                        notFound: 'Not found',
                        startDate: 'Start Date',
                        endDate: 'End Date',
                        description: 'Description',
                        fromCountry: 'From Country',
                        toCountry: 'To Country',
                        status: 'Status',
                        flowDetails: 'Flow Details',
                        age: 'Age',
                        income: 'Income',
                        gender: 'Gender',
                        education: 'Education',
                        occupation: 'Occupation',
                        person: 'Person',
                        remove: 'Remove',
                        addPerson: 'Add person',
                        submit: 'Submit',
                        exportCSV: 'Export to CSV',
                        user: 'User',
                        actions: 'Actions'
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
                        hello: 'Привіт, ',
                        admin: 'Панель адміна'
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
                    },
                    login: {
                        login: 'Увійти в обліковий запис',
                        email: 'Електронна пошта',
                        password: 'Пароль',
                        button: 'Увійти',
                        signup: 'Ще не маєте облікового запису?'
                    },
                    signup: {
                        create: 'Створити обліковий запис',
                        name: 'Ім\'я',
                        email: 'Електронна пошта',
                        password: 'Пароль'
                    },
                    userMigration: {
                        newMigrationButton: 'Додати нове міграційне переміщення',
                        searchByDescription: 'Пошук за описом',
                        notFound: 'Не знайдено',
                        startDate: 'Початкова дата',
                        endDate: 'Кінцева дата',
                        description: 'Опис',
                        fromCountry: 'З Країни',
                        toCountry: 'В Країну',
                        status: 'Статус',
                        flowDetails: 'Деталі переміщення',
                        age: 'Вік',
                        income: 'Дохід',
                        gender: 'Стать',
                        education: 'Освіта',
                        occupation: 'Рід діяльності',
                        person: 'Особа',
                        remove: 'Вилучити',
                        addPerson: 'Додати особу',
                        submit: 'Надіслати',
                        exportCSV: 'Експортувати у CSV',
                        user: 'Користувач',
                        actions: 'Дії'
                    }
                }
            }
        }
    });

export default i18n;
