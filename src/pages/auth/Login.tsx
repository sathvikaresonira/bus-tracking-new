import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bus, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple mock authentication
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role || '');

    if (role === 'admin') {
      navigate("/admin");
      toast.success("Welcome back, Admin!");
    } else if (role === 'parent') {
      navigate("/parent");
      toast.success("Welcome, Parent!");
    } else if (role === 'driver') {
      toast.success("Welcome, Driver!");
      navigate("/driver");
    } else {
      toast.error("Invalid role");
    }
  };

  const formattedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 gap-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Role Selection
      </Button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Bus className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{formattedRole} Login</CardTitle>
            <CardDescription>Sign in to access the {role} portal</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={`yourname@${role || 'example'}.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full h-11 text-base">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo: Click Sign In to access the dashboard</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
