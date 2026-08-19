import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaHeart,
    FaUser,
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaCheckCircle
} from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fff9fb] flex items-center justify-center px-4 py-12 relative overflow-hidden">

            {/* Decorative background */}

            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#f9d6e3] rounded-full opacity-60"></div>

            <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-[#fce8ef] rounded-full opacity-70"></div>

            <div className="absolute top-24 left-[12%] text-pink-200 text-2xl rotate-12">
                ♡
            </div>

            <div className="absolute bottom-28 right-[14%] text-pink-200 text-xl -rotate-12">
                ✦
            </div>


            {/* Main Card */}

            <div className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-xl border border-pink-100 overflow-hidden">

                <div className="grid md:grid-cols-2">


                    {/* ================= LEFT SIDE ================= */}

                    <div className="hidden md:flex relative bg-[#fff0f5] p-12 flex-col justify-between overflow-hidden">

                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#f7cfdd] rounded-full opacity-60"></div>

                        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#fce0e9] rounded-full opacity-70"></div>


                        {/* Logo */}

                        <div className="relative z-10">

                            <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full text-[#c66d8b] text-sm font-bold border border-pink-100">
                                <FaHeart className="text-pink-400" />
                                Petal & Yarn
                            </div>

                        </div>


                        {/* Illustration */}

                        <div className="relative z-10 text-center">

                            <div className="relative w-64 h-64 mx-auto mb-8">

                                <div className="absolute inset-0 bg-white rounded-full shadow-sm"></div>

                                <div className="absolute inset-5 rounded-full bg-[#fff8fa] flex items-center justify-center">

                                    <div className="text-center">

                                        <div className="text-7xl mb-3">
                                            🌸
                                        </div>

                                        <div className="flex justify-center gap-1 text-pink-300">
                                            <span>♡</span>
                                            <span>♡</span>
                                            <span>♡</span>
                                        </div>

                                    </div>

                                </div>

                                <div className="absolute -top-2 left-2 text-3xl">
                                    🧶
                                </div>

                                <div className="absolute bottom-1 right-0 text-3xl">
                                    🎀
                                </div>

                            </div>


                            <h2 className="text-3xl font-black text-[#513a45] leading-tight">
                                A little corner
                                <br />
                                made with love ♡
                            </h2>

                            <p className="mt-4 text-[#927581] leading-relaxed max-w-sm mx-auto">
                                Join our cozy little community and discover
                                handmade treasures made one stitch at a time.
                            </p>

                        </div>


                        <div className="relative z-10 text-center">

                            <p className="text-xs text-[#bd8d9e]">
                                Yarn • Flowers • Love • Tiny stitches ♡
                            </p>

                        </div>

                    </div>


                    {/* ================= RIGHT SIDE ================= */}

                    <div className="p-7 sm:p-10 lg:p-14">

                        {/* Mobile logo */}

                        <div className="md:hidden text-center mb-8">

                            <div className="inline-flex items-center gap-2 text-[#c66d8b] font-black text-xl">
                                <span className="text-2xl">
                                    🌸
                                </span>

                                Petal & Yarn
                            </div>

                        </div>


                        {/* Heading */}

                        <div className="mb-8">

                            <div className="w-12 h-12 rounded-2xl bg-[#fff0f5] text-[#d47797] flex items-center justify-center text-lg mb-5">
                                {showOTP ? '✉' : <FaHeart />}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-black text-[#4c3741]">
                                {showOTP
                                    ? 'Almost there ♡'
                                    : 'Create your account'}
                            </h1>

                            <p className="text-[#947782] mt-2 leading-relaxed">

                                {showOTP
                                    ? 'Just verify your email and your cozy corner will be ready.'
                                    : 'Join Petal & Yarn and find your next handmade favorite.'}

                            </p>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="mb-6 bg-[#fff4f5] border border-[#f5d5dc] rounded-2xl p-4">

                                <div className="flex items-start gap-3">

                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#d47797] shrink-0">
                                        ♡
                                    </div>

                                    <p className="text-sm text-[#a85e73] font-medium leading-relaxed">
                                        {error}
                                    </p>

                                </div>

                            </div>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {!showOTP ? (
                                <>

                                    {/* Name */}

                                    <div>

                                        <label className="block text-sm font-bold text-[#634650] mb-2">
                                            Your name
                                        </label>

                                        <div className="relative">

                                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d29aaa]" />

                                            <input
                                                type="text"
                                                required
                                                placeholder="What should we call you?"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#efd9e0] bg-[#fffdfd] text-[#513c46] placeholder-[#bba3ac] focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-[#df91aa] transition"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* Email */}

                                    <div>

                                        <label className="block text-sm font-bold text-[#634650] mb-2">
                                            Email address
                                        </label>

                                        <div className="relative">

                                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d29aaa]" />

                                            <input
                                                type="email"
                                                required
                                                placeholder="you@example.com"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#efd9e0] bg-[#fffdfd] text-[#513c46] placeholder-[#bba3ac] focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-[#df91aa] transition"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* Password */}

                                    <div>

                                        <label className="block text-sm font-bold text-[#634650] mb-2">
                                            Create a password
                                        </label>

                                        <div className="relative">

                                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d29aaa]" />

                                            <input
                                                type="password"
                                                required
                                                placeholder="Choose a password"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#efd9e0] bg-[#fffdfd] text-[#513c46] placeholder-[#bba3ac] focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-[#df91aa] transition"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />

                                        </div>

                                    </div>

                                </>
                            ) : (

                                /* OTP */

                                <div>

                                    <div className="bg-[#fff7f9] border border-pink-100 rounded-2xl p-5 mb-5">

                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#d47797] shadow-sm">
                                                ✉
                                            </div>

                                            <div>

                                                <p className="font-bold text-[#5b414b] text-sm">
                                                    Check your email ♡
                                                </p>

                                                <p className="text-xs text-[#9b7b86] mt-1">
                                                    Your verification code is waiting for you.
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    <label className="block text-sm font-bold text-[#634650] mb-2">
                                        Verification code
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        placeholder="• • • • • •"
                                        className="w-full px-4 py-5 rounded-xl border border-[#efd9e0] bg-[#fffdfd] text-[#513c46] focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-[#df91aa] transition font-black tracking-[0.6em] text-center text-xl"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                        maxLength="6"
                                    />

                                    <p className="text-xs text-center text-[#a68b95] mt-3">
                                        Enter the 6-digit code from your email.
                                    </p>

                                </div>

                            )}


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group flex items-center justify-center gap-3 bg-[#d9799c] hover:bg-[#c96889] disabled:bg-[#e7cbd5] text-white font-black py-4 rounded-xl transition shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                            >

                                {loading ? (
                                    <>
                                        <span className="animate-spin">
                                            🧶
                                        </span>

                                        Making things cozy...
                                    </>
                                ) : (
                                    <>
                                        {showOTP
                                            ? 'Verify & Join the Cozy Corner'
                                            : 'Create My Account'}

                                        <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}

                            </button>

                        </form>


                        {/* Benefits */}

                        {!showOTP && (

                            <div className="mt-7 pt-6 border-t border-pink-50">

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                    <div className="flex items-center gap-2 text-xs text-[#987985]">
                                        <FaCheckCircle className="text-[#d989a3]" />
                                        Handmade finds
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-[#987985]">
                                        <FaCheckCircle className="text-[#d989a3]" />
                                        Cozy favorites
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-[#987985]">
                                        <FaCheckCircle className="text-[#d989a3]" />
                                        Made with love
                                    </div>

                                </div>

                            </div>

                        )}


                        {/* Login */}

                        {!showOTP && (

                            <div className="text-center mt-8">

                                <p className="text-sm text-[#967782]">

                                    Already part of our cozy corner?{' '}

                                    <Link
                                        to="/login"
                                        className="font-black text-[#c56888] hover:text-[#a94e70] hover:underline transition"
                                    >
                                        Sign in ♡
                                    </Link>

                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;