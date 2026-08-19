import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaSearch,
    FaHeart,
    FaArrowRight,
    FaStar
} from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Opening animation
    const [showIntro, setShowIntro] = useState(() => {
        return !sessionStorage.getItem('petalYarnIntroShown');
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [search]);

    // Intro animation timing
    useEffect(() => {
        if (!showIntro) return;

        const hideIntro = setTimeout(() => {
            sessionStorage.setItem('petalYarnIntroShown', 'true');
            setShowIntro(false);
        }, 2600);

        return () => clearTimeout(hideIntro);
    }, [showIntro]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* =========================================================
                PETAL & YARN OPENING ANIMATION
            ========================================================== */}

            {showIntro && (
                <div className="fixed inset-0 z-[9999] bg-[#fff9fb] flex items-center justify-center overflow-hidden">

                    {/* Background blobs */}

                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#f9d7e5] rounded-full intro-blob"></div>

                    <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-[#fce4ec] rounded-full intro-blob-delay"></div>

                    {/* Floating flowers */}

                    <div className="absolute top-[18%] left-[18%] text-3xl intro-flower">
                        🌸
                    </div>

                    <div className="absolute top-[25%] right-[20%] text-2xl intro-flower-delay">
                        🌷
                    </div>

                    <div className="absolute bottom-[22%] left-[25%] text-2xl intro-flower-delay-2">
                        ✿
                    </div>

                    <div className="absolute bottom-[25%] right-[25%] text-3xl intro-flower">
                        🌸
                    </div>


                    {/* Main intro */}

                    <div className="relative z-10 text-center">

                        {/* Yarn ball */}

                        <div className="relative w-36 h-36 mx-auto mb-7 intro-yarn">

                            <div className="absolute inset-0 bg-white rounded-full shadow-xl border border-pink-100"></div>

                            <div className="absolute inset-4 rounded-full bg-[#f8d3df] flex items-center justify-center shadow-inner">

                                <div className="text-6xl">
                                    🧶
                                </div>

                            </div>

                            {/* Yarn thread */}

                            <div className="absolute -right-16 top-1/2 w-20 h-10 border-b-2 border-pink-300 rounded-full intro-thread"></div>

                        </div>


                        {/* Brand */}

                        <div className="intro-brand">

                            <div className="flex items-center justify-center gap-3">

                                <span className="text-3xl">
                                    🌸
                                </span>

                                <h1 className="text-4xl sm:text-5xl font-black text-[#b96080] tracking-tight">
                                    Petal & Yarn
                                </h1>

                                <span className="text-3xl">
                                    🌸
                                </span>

                            </div>

                        </div>


                        {/* Tagline */}

                        <p className="mt-4 text-[#987580] text-sm sm:text-base font-medium intro-tagline">
                            Handmade with love, stitch by stitch ♡
                        </p>


                        {/* Little loading stitches */}

                        <div className="flex justify-center gap-2 mt-7">

                            <span className="w-2 h-2 rounded-full bg-[#df91aa] intro-dot-1"></span>

                            <span className="w-2 h-2 rounded-full bg-[#e8b1c2] intro-dot-2"></span>

                            <span className="w-2 h-2 rounded-full bg-[#f0ced9] intro-dot-3"></span>

                        </div>

                    </div>


                    {/* Skip */}

                    <button
                        onClick={() => {
                            sessionStorage.setItem('petalYarnIntroShown', 'true');
                            setShowIntro(false);
                        }}
                        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-[#b98a99] hover:text-[#c66b8c] transition"
                    >
                        Skip intro
                    </button>


                    {/* Intro animation styles */}

                    <style>{`

                        @keyframes yarnBounce {
                            0% {
                                opacity: 0;
                                transform: scale(0.4) translateY(30px) rotate(-20deg);
                            }

                            45% {
                                opacity: 1;
                                transform: scale(1.08) translateY(-8px) rotate(8deg);
                            }

                            65% {
                                transform: scale(0.96) translateY(2px) rotate(-3deg);
                            }

                            80% {
                                transform: scale(1.02) translateY(-2px);
                            }

                            100% {
                                opacity: 1;
                                transform: scale(1) translateY(0) rotate(0);
                            }
                        }

                        @keyframes brandReveal {
                            0% {
                                opacity: 0;
                                transform: translateY(18px);
                                letter-spacing: 0.08em;
                            }

                            100% {
                                opacity: 1;
                                transform: translateY(0);
                                letter-spacing: -0.02em;
                            }
                        }

                        @keyframes taglineReveal {
                            0% {
                                opacity: 0;
                                transform: translateY(10px);
                            }

                            100% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes flowerFloat {
                            0% {
                                opacity: 0;
                                transform: translateY(20px) rotate(-15deg) scale(0.5);
                            }

                            40% {
                                opacity: 1;
                            }

                            100% {
                                opacity: 0.8;
                                transform: translateY(-25px) rotate(12deg) scale(1);
                            }
                        }

                        @keyframes blobFloat {
                            0% {
                                transform: scale(0.9);
                            }

                            50% {
                                transform: scale(1.05);
                            }

                            100% {
                                transform: scale(0.9);
                            }
                        }

                        @keyframes dotPulse {
                            0%, 100% {
                                transform: translateY(0);
                                opacity: 0.4;
                            }

                            50% {
                                transform: translateY(-5px);
                                opacity: 1;
                            }
                        }

                        @keyframes threadDraw {
                            0% {
                                width: 0;
                                opacity: 0;
                            }

                            100% {
                                width: 80px;
                                opacity: 1;
                            }
                        }

                        .intro-yarn {
                            animation: yarnBounce 0.9s cubic-bezier(.2,.8,.2,1) forwards;
                        }

                        .intro-brand {
                            opacity: 0;
                            animation: brandReveal 0.8s ease-out 0.75s forwards;
                        }

                        .intro-tagline {
                            opacity: 0;
                            animation: taglineReveal 0.7s ease-out 1.2s forwards;
                        }

                        .intro-flower {
                            animation: flowerFloat 1.8s ease-out 0.2s forwards;
                        }

                        .intro-flower-delay {
                            opacity: 0;
                            animation: flowerFloat 1.8s ease-out 0.5s forwards;
                        }

                        .intro-flower-delay-2 {
                            opacity: 0;
                            animation: flowerFloat 1.8s ease-out 0.8s forwards;
                        }

                        .intro-blob {
                            animation: blobFloat 3s ease-in-out infinite;
                        }

                        .intro-blob-delay {
                            animation: blobFloat 3.5s ease-in-out 0.5s infinite;
                        }

                        .intro-thread {
                            animation: threadDraw 0.8s ease-out 0.5s forwards;
                        }

                        .intro-dot-1 {
                            animation: dotPulse 0.8s ease-in-out 1.3s infinite;
                        }

                        .intro-dot-2 {
                            animation: dotPulse 0.8s ease-in-out 1.5s infinite;
                        }

                        .intro-dot-3 {
                            animation: dotPulse 0.8s ease-in-out 1.7s infinite;
                        }

                    `}</style>

                </div>
            )}


            {/* =========================================================
                MAIN HOME PAGE
            ========================================================== */}

            <div className="min-h-screen bg-[#fffafc] text-[#4b3540]">

                {/* ================= HERO ================= */}

                <section className="relative overflow-hidden">

                    <div className="absolute inset-0 bg-[#fff3f7]"></div>

                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#f9d7e5] rounded-full opacity-60"></div>

                    <div className="absolute top-40 -left-32 w-72 h-72 bg-[#fce4ec] rounded-full opacity-70"></div>

                    <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-[#fff0c9] rounded-full opacity-40"></div>


                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-16 md:pt-16 md:pb-24">

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">


                            {/* Hero Copy */}

                            <div className="text-center lg:text-left">

                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-pink-100 shadow-sm text-[#c66b8c] text-sm font-semibold mb-6">

                                    <FaHeart className="text-pink-400 text-xs" />

                                    Handmade with love

                                    <span>♡</span>

                                </div>


                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#4b3540]">

                                    Little things
                                    <br />

                                    made with
                                    <br />

                                    <span className="text-[#d9799c]">
                                        lots of love.
                                    </span>

                                </h1>


                                <p className="mt-6 text-lg sm:text-xl text-[#806773] leading-relaxed max-w-xl mx-auto lg:mx-0">

                                    Cute crochet treasures, soft little friends and
                                    handmade pieces created stitch by stitch —
                                    just waiting to find their forever home. 🧶

                                </p>


                                {/* Search */}

                                <div className="mt-8 max-w-xl mx-auto lg:mx-0">

                                    <div className="relative group">

                                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#d59aae] text-lg" />

                                        <input
                                            type="text"
                                            placeholder="What are you looking for?"
                                            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border border-[#f1d5df] shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-[#df8eaa] text-[#4b3540] placeholder-[#b99ba7] transition"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />

                                    </div>

                                </div>


                                <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-sm">

                                    <span className="px-3 py-1.5 rounded-full bg-white text-[#9b687a] border border-pink-100">
                                        🧶 Handmade
                                    </span>

                                    <span className="px-3 py-1.5 rounded-full bg-white text-[#9b687a] border border-pink-100">
                                        🌸 Small batch
                                    </span>

                                    <span className="px-3 py-1.5 rounded-full bg-white text-[#9b687a] border border-pink-100">
                                        🎀 Made for you
                                    </span>

                                </div>

                            </div>


                            {/* Hero Image */}

                            <div className="relative">

                                <div className="absolute -top-5 -right-3 sm:right-3 bg-white px-4 py-3 rounded-2xl shadow-lg border border-pink-100 rotate-3 z-20">

                                    <div className="flex items-center gap-2">

                                        <FaStar className="text-[#e6a65d]" />

                                        <div>

                                            <p className="text-xs text-[#9a7a84]">
                                                Made by hand
                                            </p>

                                            <p className="text-sm font-bold text-[#5b3d49]">
                                                With lots of love ♡
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white rotate-1">

                                    <img
                                        src="https://i.pinimg.com/736x/db/6a/50/db6a50b202caf0023507d41107ea9b6e.jpg"
                                        alt="Handmade crochet and yarn"
                                        className="w-full h-[420px] sm:h-[500px] object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#5b3d49]/30 via-transparent to-transparent"></div>

                                </div>


                                <div className="absolute -bottom-5 -left-4 sm:left-3 bg-[#fff8dc] px-5 py-3 rounded-2xl shadow-lg rotate-[-4deg] border border-[#f4e6b4]">

                                    <p className="text-sm font-bold text-[#806338]">
                                        🌷 Tiny stitches,
                                    </p>

                                    <p className="text-sm font-bold text-[#806338]">
                                        big happiness.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= TRUST BAR ================= */}

                <section className="bg-white border-y border-pink-50">

                    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[#856672]">

                                <span className="w-9 h-9 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center">
                                    🧶
                                </span>

                                <span className="text-sm font-semibold">
                                    Handmade
                                </span>

                            </div>


                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[#856672]">

                                <span className="w-9 h-9 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center">
                                    ♡
                                </span>

                                <span className="text-sm font-semibold">
                                    Made with care
                                </span>

                            </div>


                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[#856672]">

                                <span className="w-9 h-9 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center">
                                    🎀
                                </span>

                                <span className="text-sm font-semibold">
                                    Cute & unique
                                </span>

                            </div>


                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[#856672]">

                                <span className="w-9 h-9 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center">
                                    ✨
                                </span>

                                <span className="text-sm font-semibold">
                                    Small batches
                                </span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= SHOP INTRO ================= */}

                <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-8">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                        <div>

                            <p className="text-sm uppercase tracking-[0.2em] font-bold text-[#d17c9b] mb-3">
                                Fresh from the yarn basket
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-black text-[#4b3540]">
                                Made to make you smile ♡
                            </h2>

                            <p className="mt-3 text-[#927580] max-w-xl">
                                Browse our little collection of handmade goodies.
                                Every piece is created with patience, yarn and a
                                whole lot of love.
                            </p>

                        </div>

                        <div className="text-sm font-semibold text-[#b77b8f]">
                            {events.length} little treasures
                        </div>

                    </div>

                </section>


                {/* ================= PRODUCTS ================= */}

                <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20">

                    {loading ? (

                        <div className="py-24 text-center">

                            <div className="text-5xl mb-5 animate-pulse">
                                🧶
                            </div>

                            <p className="text-lg font-semibold text-[#b4778d]">
                                Finding the cutest little treasures...
                            </p>

                        </div>

                    ) : events.length === 0 ? (

                        <div className="py-24 text-center bg-white rounded-3xl border border-pink-100">

                            <div className="text-5xl mb-5">
                                🌸
                            </div>

                            <h3 className="text-xl font-bold text-[#5a3d49] mb-2">
                                Nothing here yet ♡
                            </h3>

                            <p className="text-[#9b7c86]">
                                Try searching for another cozy creation.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">

                            {events.map((event) => (

                                <div
                                    key={event._id}
                                    className="group"
                                >

                                    <div className="relative overflow-hidden rounded-[1.75rem] bg-[#fdf0f4] aspect-[4/3]">

                                        {event.image ? (

                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center text-[#d394a9] text-2xl font-bold">
                                                🧶 {event.category || 'Crochet'}
                                            </div>

                                        )}


                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#9c6077] shadow-sm">
                                            {event.category || 'Handmade'}
                                        </div>


                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-black text-[#c86f91] shadow-sm">
                                            {event.ticketPrice === 0
                                                ? 'FREE'
                                                : `₹${event.ticketPrice}`
                                            }
                                        </div>

                                    </div>


                                    <div className="px-1 pt-5">

                                        <div className="flex items-start justify-between gap-3">

                                            <div>

                                                <h3 className="text-xl font-bold text-[#4b3540] group-hover:text-[#c66f90] transition">
                                                    {event.title}
                                                </h3>

                                                <p className="text-sm text-[#9b7c86] mt-1">
                                                    {event.category || 'Handmade crochet'}
                                                </p>

                                            </div>


                                            <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-300 flex items-center justify-center shrink-0">
                                                <FaHeart className="text-sm" />
                                            </div>

                                        </div>


                                        <div className="mt-4 flex flex-col gap-2 text-sm text-[#806773]">

                                            <div className="flex items-center gap-2">

                                                <FaCalendarAlt className="text-[#d792a9]" />

                                                <span>
                                                    {new Date(event.date).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        }
                                                    )}
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-2">

                                                <FaMapMarkerAlt className="text-[#d792a9]" />

                                                <span>
                                                    {event.location}
                                                </span>

                                            </div>

                                        </div>


                                        <div className="mt-4">

                                            <div className="flex justify-between text-xs text-[#a78490] mb-2">

                                                <span>
                                                    {event.availableSeats} pieces left
                                                </span>

                                                <span>
                                                    {event.totalSeats} total
                                                </span>

                                            </div>


                                            <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">

                                                <div
                                                    className="h-full bg-[#dc8ca7] rounded-full"
                                                    style={{
                                                        width: `${Math.min(
                                                            (event.availableSeats / event.totalSeats) * 100,
                                                            100
                                                        )}%`
                                                    }}
                                                ></div>

                                            </div>

                                        </div>


                                        <Link
                                            to={`/events/${event._id}`}
                                            className="mt-5 flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-[#fce8ef] text-[#a95876] font-bold hover:bg-[#f7d7e2] transition"
                                        >

                                            <span>
                                                Take a closer look
                                            </span>

                                            <FaArrowRight className="text-sm" />

                                        </Link>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* ================= BRAND STORY ================= */}

                <section className="bg-[#fff1f5] border-y border-pink-100">

                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20">

                        <div className="grid md:grid-cols-3 gap-10 items-center">

                            <div className="md:col-span-1 text-center md:text-left">

                                <p className="text-sm uppercase tracking-[0.2em] font-bold text-[#cf7898] mb-3">
                                    Why Petal & Yarn?
                                </p>

                                <h2 className="text-3xl sm:text-4xl font-black text-[#503741] leading-tight">
                                    Slow-made.
                                    <br />
                                    Soft-hearted.
                                    <br />
                                    A little bit magical. ✨
                                </h2>

                            </div>


                            <div className="md:col-span-2 grid sm:grid-cols-3 gap-5">

                                <div className="bg-white p-6 rounded-2xl border border-pink-100">
                                    <div className="text-3xl mb-4">🧶</div>

                                    <h3 className="font-bold text-[#573d48] mb-2">
                                        Handmade
                                    </h3>

                                    <p className="text-sm text-[#927580] leading-relaxed">
                                        Each piece gets the time and attention
                                        it deserves.
                                    </p>
                                </div>


                                <div className="bg-white p-6 rounded-2xl border border-pink-100">
                                    <div className="text-3xl mb-4">🌷</div>

                                    <h3 className="font-bold text-[#573d48] mb-2">
                                        Thoughtful
                                    </h3>

                                    <p className="text-sm text-[#927580] leading-relaxed">
                                        Little details make every creation
                                        feel special.
                                    </p>
                                </div>


                                <div className="bg-white p-6 rounded-2xl border border-pink-100">
                                    <div className="text-3xl mb-4">💗</div>

                                    <h3 className="font-bold text-[#573d48] mb-2">
                                        Made for keeps
                                    </h3>

                                    <p className="text-sm text-[#927580] leading-relaxed">
                                        Cozy little things made to become
                                        your favorites.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= FOOTER ================= */}

                <footer className="bg-[#fffafc] pt-16 pb-8">

                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-pink-100">

                            <div className="text-center md:text-left">

                                <div className="flex items-center justify-center md:justify-start gap-2">

                                    <span className="text-2xl">
                                        🌸
                                    </span>

                                    <span className="text-2xl font-black text-[#b96080]">
                                        Petal & Yarn
                                    </span>

                                </div>

                                <p className="text-sm text-[#9b7c86] mt-2">
                                    Cute crochet things, made with love. ♡
                                </p>

                            </div>


                            <div className="flex items-center gap-2 text-sm text-[#a77c89]">

                                <FaHeart className="text-pink-300" />

                                <span>
                                    Thank you for supporting handmade.
                                </span>

                            </div>

                        </div>


                        <div className="pt-6 text-center text-xs text-[#c19da9]">
                            &copy; {new Date().getFullYear()} Petal & Yarn · Handmade with love ♡
                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
};

export default Home;