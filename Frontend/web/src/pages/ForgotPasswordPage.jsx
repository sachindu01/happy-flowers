import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent, CardHeader, CardFooter } from "../components/ui/Card";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [successPayload, setSuccessPayload] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessPayload(null);

        try {
            const res = await api.post("/auth/forgot-password", { email });
            setSuccessPayload(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to process request. Please check the email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-emerald-50/30">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
                <Card className="shadow-2xl shadow-emerald-900/5 overflow-hidden border-slate-100">
                    <CardHeader className="text-center pt-8 pb-4">
                        <h1 className="text-3xl font-black text-slate-900">Forgot Password</h1>
                        <p className="text-slate-500 font-medium pt-1">Enter your email to receive a reset link.</p>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        {!successPayload ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-3 rounded-lg font-bold">
                                        {error}
                                    </div>
                                )}
                                <Input
                                    type="email"
                                    label="Email Address"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button type="submit" className="w-full h-[50px] text-lg mt-4" disabled={loading}>
                                    {loading ? "Processing..." : "Send Reset Link"}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center space-y-4 animate-fade-in-up">
                                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm p-4 rounded-xl font-medium">
                                    <p className="font-bold text-emerald-800 mb-2">Email Sent! (Simulated)</p>
                                    {successPayload.message}
                                </div>
                                {successPayload.mockToken && (
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Development Shortcut</p>
                                        <Link to={`/reset-password/${successPayload.mockToken}`}>
                                            <Button variant="secondary" className="w-full">
                                                Click here to reset password
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="bg-slate-50 p-6 text-center border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-medium">
                            Remembered your password?{" "}
                            <Link to="/login" className="text-emerald-600 font-black hover:underline">
                                Log In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
