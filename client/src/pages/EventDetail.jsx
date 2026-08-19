import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaChair,
    FaMoneyBillWave,
    FaHeart,
    FaCheckCircle,
    FaShieldAlt
} from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load this crochet creation.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg(
                    'A sweet little OTP has been sent to your email. Please verify it to confirm your order.'
                );
            } else {
                await api.post('/bookings', {
                    eventId: event._id,
                    otp
                });

                setSuccessMsg(
                    'Your order has been requested! We are waiting for the shop to confirm it. ♡'
                );

                setShowOTP(false);

                // Update local seats count dynamically after booking
                setEvent({
                    ...event,
                    availableSeats: event.availableSeats - 1
                });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Something went wrong with your order'
            );
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fffafc]">
                <div className="text-5xl mb-5 animate-pulse">
                    🧶
                </div>

                <p className="text-lg font-semibold text-[#c47793]">
                    Preparing your cozy creation...
                </p>

                <p className="text-sm text-[#aa8b96] mt-2">
                    Just a little stitch of patience ♡
                </p>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fffafc] px-5">
                <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-pink-100 max-w-md">
                    <div className="text-5xl mb-5">
                        🌸
                    </div>

                    <h2 className="text-2xl font-black text-[#513b45] mb-3">
                        Oh no ♡
                    </h2>

                    <p className="text-[#967983]">
                        {error || 'Creation not found'}
                    </p>
                </div>
            </div>
        );
    }

    const isSoldOut = event.availableSeats <= 0;

    const availabilityPercentage =
        event.totalSeats > 0
            ? Math.min(
                (event.availableSeats / event.totalSeats) * 100,
                100
            )
            : 0;

    return (
        <div className="min-h-screen bg-[#fffafc] py-8 sm:py-12">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* ================= BREADCRUMB ================= */}

                <div className="flex items-center gap-2 text-sm text-[#a98490] mb-6">
                    <span>Home</span>
                    <span>›</span>
                    <span>{event.category}</span>
                    <span>›</span>
                    <span className="text-[#c36f8d] font-semibold">
                        {event.title}
                    </span>
                </div>

                {/* ================= MAIN CARD ================= */}

                <div className="bg-white rounded-[2rem] shadow-sm border border-pink-100 overflow-hidden">

                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">

                        {/* ================= IMAGE ================= */}

                        <div className="p-4 sm:p-6 lg:p-8">

                            <div className="relative rounded-[1.75rem] overflow-hidden bg-[#fff0f5] aspect-square lg:aspect-[4/4.5]">

                                {event.image ? (
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#d28ca4] text-4xl font-bold">
                                        🧶 {event.category}
                                    </div>
                                )}

                                {/* Category */}
                                <div className="absolute top-5 left-5">
                                    <span className="bg-white/95 backdrop-blur-sm text-[#b65f7e] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                                        {event.category}
                                    </span>
                                </div>

                                {/* Heart */}
                                <div className="absolute top-5 right-5">
                                    <div className="w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-[#e58aa7]">
                                        <FaHeart />
                                    </div>
                                </div>

                                {/* Handmade badge */}
                                <div className="absolute bottom-5 left-5">
                                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                🧶
                                            </span>

                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-[#b58b98]">
                                                    Crafted with
                                                </p>

                                                <p className="text-xs font-bold text-[#5d424d]">
                                                    Love & patience ♡
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Small image caption */}

                            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#a88691]">
                                <FaHeart className="text-pink-300 text-xs" />
                                <span>
                                    Handmade with love, stitch by stitch
                                </span>
                                <FaHeart className="text-pink-300 text-xs" />
                            </div>

                        </div>

                        {/* ================= PRODUCT INFO ================= */}

                        <div className="p-6 sm:p-8 lg:p-10 flex flex-col">

                            {/* Category */}

                            <div className="mb-4">
                                <span className="text-xs uppercase tracking-[0.2em] font-black text-[#d07c99]">
                                    Petal & Yarn
                                </span>
                            </div>

                            {/* Title */}

                            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-[#4b3540]">
                                {event.title}
                            </h1>

                            {/* Short decoration */}

                            <div className="flex items-center gap-2 mt-4 mb-6">
                                <div className="w-10 h-1 rounded-full bg-[#e59ab2]"></div>
                                <div className="w-2 h-2 rounded-full bg-[#f4c5d3]"></div>
                                <div className="w-2 h-2 rounded-full bg-[#f4c5d3]"></div>
                            </div>

                            {/* Description */}

                            <p className="text-[#806773] leading-relaxed text-base sm:text-lg">
                                {event.description}
                            </p>

                            {/* ================= PRICE ================= */}

                            <div className="mt-7 bg-[#fff5f8] rounded-2xl p-5 border border-pink-100">

                                <p className="text-xs uppercase tracking-wider font-bold text-[#b58b98] mb-1">
                                    Little treasure price
                                </p>

                                <div className="flex items-end justify-between">

                                    <div>
                                        <span className="text-3xl sm:text-4xl font-black text-[#c66d8c]">
                                            {event.ticketPrice === 0
                                                ? 'Free'
                                                : `₹${event.ticketPrice}`}
                                        </span>

                                        {event.ticketPrice !== 0 && (
                                            <span className="text-sm text-[#a88a94] ml-2">
                                                handmade piece
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-3xl">
                                        🎀
                                    </span>

                                </div>

                            </div>

                            {/* ================= PRODUCT DETAILS ================= */}

                            <div className="grid grid-cols-2 gap-3 mt-5">

                                {/* Date */}

                                <div className="bg-[#fffafc] rounded-2xl p-4 border border-pink-50">

                                    <div className="w-10 h-10 rounded-xl bg-[#fce9f0] text-[#d27c99] flex items-center justify-center mb-3">
                                        <FaCalendarAlt />
                                    </div>

                                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#b497a0] mb-1">
                                        Ready On
                                    </p>

                                    <p className="font-bold text-[#57404a] text-sm">
                                        {new Date(event.date).toLocaleDateString(
                                            undefined,
                                            {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }
                                        )}
                                    </p>

                                </div>

                                {/* Location */}

                                <div className="bg-[#fffafc] rounded-2xl p-4 border border-pink-50">

                                    <div className="w-10 h-10 rounded-xl bg-[#fce9f0] text-[#d27c99] flex items-center justify-center mb-3">
                                        <FaMapMarkerAlt />
                                    </div>

                                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#b497a0] mb-1">
                                        Pickup / Delivery
                                    </p>

                                    <p className="font-bold text-[#57404a] text-sm">
                                        {event.location}
                                    </p>

                                </div>

                            </div>

                            {/* ================= AVAILABILITY ================= */}

                            <div className="mt-5">

                                <div className="flex items-center justify-between mb-2">

                                    <div className="flex items-center gap-2">
                                        <FaChair className="text-[#d17b98]" />

                                        <span className="text-sm font-bold text-[#6a4b57]">
                                            Availability
                                        </span>
                                    </div>

                                    <span
                                        className={`text-sm font-black ${event.availableSeats < 10
                                                ? 'text-orange-500'
                                                : 'text-[#bd6d89]'
                                            }`}
                                    >
                                        {event.availableSeats} left
                                    </span>

                                </div>

                                <div className="w-full h-2 bg-[#f8e7ed] rounded-full overflow-hidden">

                                    <div
                                        className={`h-full rounded-full transition-all ${event.availableSeats < 10
                                                ? 'bg-orange-400'
                                                : 'bg-[#df91aa]'
                                            }`}
                                        style={{
                                            width: `${availabilityPercentage}%`
                                        }}
                                    ></div>

                                </div>

                                <p className="text-xs text-[#a88b95] mt-2">
                                    {event.availableSeats} of {event.totalSeats} pieces still available ♡
                                </p>

                            </div>

                            {/* ================= ORDER AREA ================= */}

                            <div className="mt-7 pt-6 border-t border-pink-100">

                                {showOTP && (
                                    <div className="mb-5">

                                        <div className="bg-[#fff5f8] border border-pink-100 rounded-2xl p-4 mb-4">

                                            <div className="flex items-start gap-3">

                                                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#d47d99] shrink-0">
                                                    ✉
                                                </div>

                                                <div>
                                                    <p className="font-bold text-[#634552] text-sm">
                                                        Check your inbox ♡
                                                    </p>

                                                    <p className="text-xs text-[#9b7b86] mt-1 leading-relaxed">
                                                        We've sent a 6-digit verification code
                                                        to your email. Enter it below to place
                                                        your order.
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                        <label className="block text-sm font-bold text-[#674854] mb-2">
                                            Verification Code
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            placeholder="• • • • • •"
                                            className="w-full px-4 py-4 rounded-2xl border border-pink-200 bg-[#fffafc] focus:ring-4 focus:ring-pink-100 focus:border-[#df91aa] focus:outline-none transition font-black tracking-[0.5em] text-center text-xl text-[#684755]"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength="6"
                                        />

                                    </div>
                                )}

                                {/* Order button */}

                                <button
                                    onClick={handleBooking}
                                    disabled={
                                        isSoldOut ||
                                        bookingLoading ||
                                        (showOTP && !otp)
                                    }
                                    className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg transition shadow-sm ${isSoldOut ||
                                        (successMsg && !showOTP)
                                            ? 'bg-[#eee5e8] text-[#a99aa0] cursor-not-allowed'
                                            : 'bg-[#d9799c] hover:bg-[#c96889] text-white hover:shadow-lg hover:-translate-y-0.5'
                                        }`}
                                >
                                    {bookingLoading
                                        ? '🧶 Preparing your order...'
                                        : (
                                            showOTP
                                                ? '♡ Verify Code & Place Order'
                                                : (
                                                    successMsg && !showOTP
                                                        ? '♡ Order Requested'
                                                        : (
                                                            isSoldOut
                                                                ? 'All Snuggled Up — Sold Out'
                                                                : '♡ Order This Cutie'
                                                        )
                                                )
                                        )}
                                </button>

                                {/* Secure note */}

                                {!isSoldOut && !successMsg && (
                                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#a58a94]">
                                        <FaShieldAlt className="text-[#d58ba3]" />
                                        <span>
                                            Safe & simple checkout
                                        </span>
                                    </div>
                                )}

                                {/* Error */}

                                {error && (
                                    <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4">

                                        <div className="flex items-center gap-2 text-red-600">
                                            <span>♡</span>

                                            <p className="text-sm font-semibold">
                                                {error}
                                            </p>
                                        </div>

                                    </div>
                                )}

                                {/* Success */}

                                {successMsg && (
                                    <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-4">

                                        <div className="flex items-start gap-3">

                                            <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />

                                            <p className="text-sm font-semibold text-green-700 leading-relaxed">
                                                {successMsg}
                                            </p>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                </div>

                {/* ================= BOTTOM TRUST SECTION ================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

                    <div className="bg-white rounded-2xl border border-pink-100 p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#fff0f5] flex items-center justify-center text-xl">
                            🧶
                        </div>

                        <div>
                            <p className="font-bold text-[#5a404b] text-sm">
                                Handmade
                            </p>

                            <p className="text-xs text-[#a58b95] mt-1">
                                Crafted stitch by stitch
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-pink-100 p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#fff0f5] flex items-center justify-center text-xl">
                            💕
                        </div>

                        <div>
                            <p className="font-bold text-[#5a404b] text-sm">
                                Made With Love
                            </p>

                            <p className="text-xs text-[#a58b95] mt-1">
                                Tiny details, big heart
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-pink-100 p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#fff0f5] flex items-center justify-center text-xl">
                            🎀
                        </div>

                        <div>
                            <p className="font-bold text-[#5a404b] text-sm">
                                Special & Unique
                            </p>

                            <p className="text-xs text-[#a58b95] mt-1">
                                Made for someone special
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default EventDetail;