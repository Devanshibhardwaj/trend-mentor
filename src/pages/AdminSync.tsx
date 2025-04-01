
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<null | { success: number; errors: number }>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not signed in
  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSyncProfiles = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    
    try {
      // Fetch all auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError;
      }
      
      let successCount = 0;
      let errorCount = 0;
      
      // For each auth user, check if they have a profile, if not create one
      for (const user of authUsers.users) {
        // Check if user already has a profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (!existingProfile) {
          // Create profile for user
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id, 
              email: user.email,
              created_at: new Date().toISOString(),
              last_sign_in: user.last_sign_in_at,
              sign_in_count: 1
            });
          
          if (insertError) {
            console.error(`Failed to create profile for ${user.email}:`, insertError);
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          // Profile already exists
          successCount++;
        }
      }
      
      setSyncResult({ success: successCount, errors: errorCount });
      
      if (errorCount === 0) {
        toast.success(`Successfully synced ${successCount} users!`);
      } else {
        toast.error(`Synced ${successCount} users, but encountered ${errorCount} errors`);
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync profiles. Check console for details.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin: Sync Profiles</CardTitle>
            <CardDescription>
              Sync existing authentication users with the profiles table
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This utility will create profile records for any authenticated users that don't have one yet. 
              This is useful if you have users who signed up before the profile system was implemented.
            </p>
            
            {syncResult && (
              <div className={`p-4 mb-4 rounded-md ${syncResult.errors === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'}`}>
                <div className="flex items-center">
                  {syncResult.errors === 0 ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <span>
                    Synced {syncResult.success} users 
                    {syncResult.errors > 0 && `, ${syncResult.errors} errors`}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleSyncProfiles} 
              disabled={isSyncing}
              className="w-full"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing Profiles...
                </>
              ) : (
                'Sync User Profiles'
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminSync;
