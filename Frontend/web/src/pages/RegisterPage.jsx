import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent, CardHeader, CardFooter } from "../components/ui/Card";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        name,
        // Backend DTO doesn't take role; it defaults to Role.USER
      });
      // Backend returns AuthResponse(String accessToken)
      login(res.data.accessToken);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please bridge the gaps.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <Card className="shadow-2xl shadow-emerald-900/5 overflow-hidden border-slate-100">
          <CardHeader className="text-center pt-8 pb-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✿
            </div>
            <h1 className="text-3xl font-black text-slate-900">Join Us</h1>
            <p className="text-slate-500 font-medium pt-1">Create an account to start shopping.</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-3 rounded-lg font-bold">
                  {error}
                </div>
              )}

              <Input
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-[50px] text-lg"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-black hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
