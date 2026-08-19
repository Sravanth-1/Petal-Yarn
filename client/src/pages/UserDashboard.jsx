import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaTicketAlt,
    FaTimesCircle,
    FaHeart,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaArrowRight,
    FaCheckCircle,
    FaClock,
    FaCreditCard
} from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this order request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling order');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] bg-[#fff9fb] flex flex-col items-center justify-center">
                <div className="text-5xl mb-5 animate-pulse">
                    🧶
                </div>

                <p className="text-lg font-bold text-[#c47793]">
                    Opening your cozy corner...
                </p>

                <p className="text-sm text-[#a58b95] mt-2">
                    Gathering all your little treasures ♡
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff9fb] py-8 sm:py-12">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">


                {/* ================= PROFILE HEADER ================= */}

                <div className="relative overflow-hidden bg-white rounded-[2rem] border border-pink-100 shadow-sm mb-10">

                    {/* Decorative background */}

                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#fce2eb] rounded-full opacity-70"></div>

                    <div className="absolute -bottom-28 -left-20 w-64 h-64 bg-[#fff0f5] rounded-full"></div>

                    <div className="relative p-7 sm:p-10">

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                            {/* Avatar */}

                            <div className="relative shrink-0">

                                <div className="w-24 h-24 rounded-[1.75rem] bg-[#fff0f5] border-4 border-white shadow-md flex items-center justify-center text-4xl font-black text-[#c86f8e] uppercase">
                                    {user?.name?.charAt(0)}
                                </div>

                                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-400 border border-pink-100">
                                    ♡
                                </div>

                            </div>


                            {/* User info */}

                            <div className="text-center sm:text-left flex-grow">

                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff0f5] text-[#bd6d89] text-xs font-bold mb-3">
                                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                    Cozy Corner Member
                                </div>

                                <h1 className="text-3xl sm:text-4xl font-black text-[#4d3842]">
                                    Hello, {user?.name}! ♡
                                </h1>

                                <p className="text-[#947782] mt-2">
                                    Welcome back to your little collection of handmade treasures.
                                </p>

                            </div>


                            {/* Little decoration */}

                            <div className="hidden md:block text-6xl opacity-70">
                                🌸
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= SECTION HEADER ================= */}

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">

                    <div>

                        <div className="flex items-center gap-2 mb-2">

                            <FaHeart className="text-[#df8da8]" />

                            <span className="text-xs uppercase tracking-[0.2em] font-black text-[#c47793]">
                                Your collection
                            </span>

                        </div>

                        <h2 className="text-3xl font-black text-[#4b3540]">
                            My Cozy Orders
                        </h2>

                    </div>

                    {bookings.length > 0 && (
                        <div className="text-sm font-semibold text-[#a17d89]">
                            {bookings.length} {bookings.length === 1 ? 'order' : 'orders'}
                        </div>
                    )}

                </div>


                {/* ================= EMPTY STATE ================= */}

                {bookings.length === 0 ? (

                    <div className="bg-white rounded-[2rem] border border-pink-100 shadow-sm p-10 sm:p-16 text-center">

                        <div className="relative w-28 h-28 mx-auto mb-7">

                            <div className="absolute inset-0 bg-[#fff0f5] rounded-full"></div>

                            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-5xl">
                                    🧶
                                </span>
                            </div>

                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-[#513b45] mb-3">
                            Your cozy shelf is empty ♡
                        </h3>

                        <p className="text-[#967883] max-w-md mx-auto leading-relaxed mb-8">
                            You haven't picked out a handmade creation yet.
                            There's a whole little world of yarny treasures waiting for you.
                        </p>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-3 bg-[#d9799c] hover:bg-[#c96889] text-white font-black px-7 py-3.5 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
                        >
                            Explore Handmade Creations
                            <FaArrowRight className="text-sm" />
                        </Link>

                    </div>

                ) : (

                    /* ================= ORDERS ================= */

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="group bg-white rounded-[1.5rem] overflow-hidden border border-pink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col"
                            >

                                {booking.eventId ? (
                                    <>

                                        {/* ================= PRODUCT IMAGE ================= */}

                                        <div className="relative h-52 bg-[#fff0f5] overflow-hidden">

                                            {booking.eventId.image ? (

                                                <img
                                                    src={booking.eventId.image}
                                                    alt={booking.eventId.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />

                                            ) : (

                                                <div className="w-full h-full flex items-center justify-center text-4xl">
                                                    🧶
                                                </div>

                                            )}

                                            {/* Soft overlay */}

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#4b3540]/30 via-transparent to-transparent"></div>


                                            {/* Category */}

                                            <div className="absolute top-4 left-4">

                                                <span className="bg-white/95 backdrop-blur-sm text-[#b96582] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                    {booking.eventId.category || 'Handmade'}
                                                </span>

                                            </div>


                                            {/* Status */}

                                            <div className="absolute top-4 right-4 flex flex-col items-end gap-2">

                                                <span
                                                    className={`px-3 py-1.5 text-[10px] font-black rounded-full uppercase tracking-wider shadow-sm ${
                                                        booking.status === 'confirmed'
                                                            ? 'bg-green-100 text-green-700'
                                                            : booking.status === 'cancelled'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {booking.status}
                                                </span>

                                                {booking.status !== 'cancelled' && (

                                                    <span
                                                        className={`px-3 py-1.5 text-[10px] font-black rounded-full uppercase tracking-wider shadow-sm ${
                                                            booking.paymentStatus === 'paid'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-white text-gray-600'
                                                        }`}
                                                    >
                                                        {booking.paymentStatus.replace('_', ' ')}
                                                    </span>

                                                )}

                                            </div>

                                        </div>


                                        {/* ================= PRODUCT INFO ================= */}

                                        <div className="p-6 flex-grow">

                                            <div className="flex items-start justify-between gap-3 mb-5">

                                                <h3 className="text-xl font-black text-[#4c3741] leading-tight group-hover:text-[#c56888] transition">
                                                    {booking.eventId.title}
                                                </h3>

                                                <div className="w-9 h-9 rounded-full bg-[#fff0f5] text-[#df8da8] flex items-center justify-center shrink-0">
                                                    <FaHeart className="text-sm" />
                                                </div>

                                            </div>


                                            {/* Details */}

                                            <div className="space-y-3">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-xl bg-[#fff5f8] text-[#d17c99] flex items-center justify-center shrink-0">
                                                        <FaCalendarAlt className="text-sm" />
                                                    </div>

                                                    <div>

                                                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#b49aa3]">
                                                            Ready date
                                                        </p>

                                                        <p className="text-sm font-bold text-[#634650]">
                                                            {new Date(
                                                                booking.eventId.date
                                                            ).toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                }
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-xl bg-[#fff5f8] text-[#d17c99] flex items-center justify-center shrink-0">
                                                        <FaCreditCard className="text-sm" />
                                                    </div>

                                                    <div>

                                                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#b49aa3]">
                                                            Price
                                                        </p>

                                                        <p className="text-sm font-bold text-[#634650]">
                                                            {booking.amount === 0
                                                                ? 'Free'
                                                                : `₹${booking.amount}`}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-xl bg-[#fff5f8] text-[#d17c99] flex items-center justify-center shrink-0">
                                                        <FaClock className="text-sm" />
                                                    </div>

                                                    <div>

                                                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#b49aa3]">
                                                            Ordered
                                                        </p>

                                                        <p className="text-sm font-bold text-[#634650]">
                                                            {new Date(
                                                                booking.bookedAt
                                                            ).toLocaleDateString()}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        {/* ================= ACTIONS ================= */}

                                        <div className="p-4 bg-[#fffafc] border-t border-pink-50 flex items-center justify-between gap-3">

                                            {booking.status !== 'cancelled' ? (
                                                <>

                                                    <Link
                                                        to={`/events/${booking.eventId._id}`}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-[#fce8ef] hover:bg-[#f7d7e2] text-[#a95876] font-bold text-sm py-3 rounded-xl transition"
                                                    >
                                                        View Creation
                                                        <FaArrowRight className="text-xs" />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            cancelBooking(booking._id)
                                                        }
                                                        className="w-11 h-11 rounded-xl bg-white border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center"
                                                        title="Cancel order"
                                                    >
                                                        <FaTimesCircle />
                                                    </button>

                                                </>
                                            ) : (

                                                <div className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[#a9949d] italic">
                                                    <FaTimesCircle />
                                                    Order cancelled
                                                </div>

                                            )}

                                        </div>

                                    </>

                                ) : (

                                    /* ================= MISSING EVENT ================= */

                                    <div className="p-8 text-center flex-grow flex flex-col items-center justify-center">

                                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                                            <FaTimesCircle className="text-red-300 text-2xl" />
                                        </div>

                                        <p className="text-sm font-semibold text-red-500">
                                            Creation unavailable
                                        </p>

                                        <p className="text-xs text-[#a58b95] mt-2">
                                            This creation may have been removed.
                                        </p>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}


                {/* ================= BOTTOM MESSAGE ================= */}

                {bookings.length > 0 && (

                    <div className="mt-12 bg-[#fff0f5] rounded-[2rem] border border-pink-100 p-7 sm:p-9">

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">

                            <div>

                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                    <FaHeart className="text-[#df8da8]" />

                                    <span className="text-xs uppercase tracking-[0.2em] font-black text-[#c47793]">
                                        Keep exploring
                                    </span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-[#513b45]">
                                    Found something else you love? ♡
                                </h3>

                                <p className="text-sm text-[#947782] mt-1">
                                    There are always more tiny treasures waiting.
                                </p>

                            </div>

                            <Link
                                to="/"
                                className="shrink-0 inline-flex items-center gap-3 bg-white hover:bg-[#fff9fb] text-[#b45f7c] font-black px-6 py-3.5 rounded-xl border border-pink-100 shadow-sm transition"
                            >
                                Browse More
                                <FaArrowRight className="text-xs" />
                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default UserDashboard;