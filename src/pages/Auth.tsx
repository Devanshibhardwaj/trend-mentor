
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { SocialAuthButtons } from '@/components/AuthButtons';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { user, signIn, signUp, resendVerificationEmail } = useAuth();

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message === 'Email not confirmed') {
            setVerificationNeeded(true);
            setError('Your email has not been verified. Please check your inbox or request a new verification link.');
          } else {
            throw error;
          }
        } else {
          toast.success('Successfully signed in!');
          navigate('/');
        }
      } else {
        // For registration flow
        const { error, isNewUser } = await signUp(email, password);
        if (error) {
          if (error.message === 'User already registered') {
            // If user exists, show a helpful message and switch to login tab
            setActiveTab('login');
            setError('This email is already registered. Please sign in instead.');
          } else {
            throw error;
          }
        } else if (isNewUser) {
          // If email verification is required by Supabase
          setVerificationNeeded(true);
          setError('Registration successful! Please check your email for verification link.');
        } else {
          // User is auto-signed in (if email verification is disabled in Supabase)
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const { error } = await resendVerificationEmail(email);
      if (error) {
        throw error;
      }
      toast.success('Verification email has been sent!');
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === 'login' 
                  ? 'Sign in to your account to access your personal style recommendations'
                  : 'Join StyleSage AI and discover your perfect style'}
              </CardDescription>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Create Account</TabsTrigger>
              </TabsList>
              
              {error && (
                <div className="px-6 pt-4">
                  <Alert variant="destructive" className={verificationNeeded ? "bg-amber-100 text-amber-800 border-amber-200" : ""}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                    {verificationNeeded && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full" 
                        onClick={handleResendVerification}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Resend Verification Email'
                        )}
                      </Button>
                    )}
                  </Alert>
                </div>
              )}
              
              <TabsContent value="login">
                <CardContent className="space-y-4 pt-4">
                  <SocialAuthButtons isLoading={isLoading} />
                  
                  <div className="flex items-center gap-2 my-4">
                    <Separator className="flex-grow" />
                    <span className="text-sm text-muted-foreground">or</span>
                    <Separator className="flex-grow" />
                  </div>
                  
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 px-0 text-xs"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 mr-1" />
                          )}
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full" disabled={isLoading} type="submit">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="register">
                <CardContent className="space-y-4 pt-4">
                  <SocialAuthButtons isLoading={isLoading} />
                  
                  <div className="flex items-center gap-2 my-4">
                    <Separator className="flex-grow" />
                    <span className="text-sm text-muted-foreground">or</span>
                    <Separator className="flex-grow" />
                  </div>
                  
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 px-0 text-xs"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 mr-1" />
                          )}
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••" 
                          required 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Password should be at least 6 characters long
                      </p>
                    </div>
                    
                    <Button className="w-full" disabled={isLoading} type="submit">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
