import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <>
            <div className="font-sans">
                <nav className="flex justify-between items-center p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">💭</span>
                        </div>
                        <h1 className="text-xl font-semibold text-blue-900">MindTone</h1>
                    </div>
                    <div className="flex items-center justify-between gap-6 text-gray-700">
                        <div className="flex gap-8">
                            <div className="hover:text-blue-700">Home</div>
                        </div>
                        <Link to={'/login'}>
                            <button className="px-4 py-1 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition">
                                Sign in
                            </button>
                        </Link>
                    </div>
                </nav>
                <section className="text-center py-16 px-6 bg-white">
                    <h1 className="text-5xl font-bold text-blue-900 mb-4">MindTone</h1>
                    <p className="text-xl text-gray-700 mb-8">
                        Decoding the emotions <br className="md:hidden" /> behind every word.
                    </p>
                    <Link to={'/login'}>
                        <button className="bg-yellow-300 px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
                            Get Started
                        </button>
                    </Link>
                    <p className="mt-6 text-gray-600 max-w-lg mx-auto">
                        Turning conversations into insights. Discover the power of sentiment analysis with <span className="text-blue-700 font-medium">MindTone</span>.
                    </p>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-12">
                    <div className="bg-blue-700 text-white rounded-lg p-6 shadow hover:shadow-lg transition">
                        <div className="text-3xl mb-4">😊</div>
                        <h3 className="text-lg font-semibold mb-2">Emotion Analysis</h3>
                        <p className="text-sm">Identify and categorize emotions in text with high accuracy.</p>
                    </div>

                    <div className="bg-teal-500 text-white rounded-lg p-6 shadow hover:shadow-lg transition">
                        <div className="text-3xl mb-4">⏱</div>
                        <h3 className="text-lg font-semibold mb-2">Real-Time Processing</h3>
                        <p className="text-sm">Analyze text data instantly and receive immediate results.</p>
                    </div>

                    <div className="bg-gray-100 text-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition">
                        <div className="text-3xl mb-4">📊</div>
                        <h3 className="text-lg font-semibold mb-2">Admin Dashboard</h3>
                        <p className="text-sm">Get an overview of sentiment trends through a dashboard.</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LandingPage
