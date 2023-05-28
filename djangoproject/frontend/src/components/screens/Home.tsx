import Section from "../ui/Section.tsx";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <Section>
                <section className="py-20">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl dark:text-white font-bold mb-4">Predict Human Migration Patterns</h1>
                        <p className="dark:text-white text-lg">Leverage our advanced system to forecast migration trends and make informed decisions.</p>
                        <Link to="/migration/internal" className="mt-8 inline-block bg-blue-100 dark:bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full py-3 px-6 font-bold">Get Started</Link>
                    </div>
                </section>
            </Section>
            <Section>
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl text-center dark:text-white font-bold mb-8">Key Features</h2>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">Data Analysis</h3>
                                    <p className="text-gray-700">Analyze vast amounts of data to identify migration patterns and trends.</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">Predictive Models</h3>
                                    <p className="text-gray-700">Utilize advanced machine learning algorithms to predict future migration movements.</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">Visualization</h3>
                                    <p className="text-gray-700">Visualize migration data and patterns through interactive charts and maps.</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <div className="bg-blue-200 rounded-lg p-8 h-full">
                                    <h3 className="text-xl text-blue-500 font-bold mb-4">Real-Time Updates</h3>
                                    <p className="text-gray-700">Receive real-time updates on migration trends and changes in movement patterns.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Section>
            <Section>
                <section className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl dark:text-white font-bold mb-4">Ready to Get Started?</h2>
                        <p className="dark:text-white text-lg mb-8">Join our platform today and make data-driven
                            decisions.</p>
                        <Link to="/register"
                           className="inline-block bg-blue-100 dark:bg-white text-blue-500 hover:bg-blue-600 hover:text-white rounded-full py-3 px-8 font-bold">Sign
                            Up Now</Link>
                    </div>
                </section>
            </Section>
        </div>
    )
}

export default Home