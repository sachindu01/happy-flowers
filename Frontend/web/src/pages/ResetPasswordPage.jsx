import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent, CardHeader, CardFooter } from "../components/ui/Card";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/reset-password", { token, newPassword });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password. Token may be invalid/expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-emerald-50/30">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
                <Card className="shadow-2xl shadow-emerald-900/5 overflow-hidden border-slate-100">
                    <CardHeader className="text-center pt-8 pb-4">
                        <h1 className="text-3xl font-black text-slate-900">Reset Password</h1>
                        <p className="text-slate-500 font-medium pt-1">Enter a secure new password below.</p>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        {!success ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-3 rounded-lg font-bold">
                                        {error}
                                    </div>
                                )}

                                <Input
                                    type="password"
                                    label="New Password"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <Input
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Button type="submit" className="w-full h-[50px] text-lg mt-4" disabled={loading}>
                                    {loading ? "Updating..." : "Update Password"}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center space-y-4 animate-fade-in-up">
                                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm p-4 rounded-xl font-bold">
                                    Password has been successfully updated!
                                </div>
                                <p className="text-sm text-slate-500 font-medium">Redirecting to login...</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="bg-slate-50 p-6 text-center border-t border-slate-100 justify-center">
                        <Link to="/login" className="text-emerald-600 font-black hover:underline text-sm">
                            Return to Login
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
