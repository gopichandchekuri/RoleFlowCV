import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ResumeProvider } from "@/lib/resumeContext";

// Import Clerk's Auth hooks
import { useAuth } from "@clerk/clerk-react";

import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MyResumesPage from "@/pages/dashboard/index";
import TemplatesPage from "@/pages/dashboard/templates";
import AIMatchPage from "@/pages/dashboard/ai-match";
import EditorPage from "@/pages/editor";
import SettingsPage from "@/pages/dashboard/settings";

/**
 * ProtectedRoute: Redirects to home/login if user is not signed in with Clerk.
 */
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load before deciding to redirect
  if (!isLoaded) return null; 

  if (!isSignedIn) {
    return <Redirect to="/" />;
  }

  return <Component />;
}

/**
 * DashboardRoute: Wraps protected pages in the Dashboard sidebar/layout.
 */
function DashboardRoute({ component: Component }: { component: React.ComponentType }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect to="/" />;
  }

  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

/**
 * Router: Handles the page switching logic.
 */
function Router() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <Switch>
      <Route path="/">
        {/* If user is signed in, send them to dashboard automatically */}
        {isSignedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
      </Route>

      <Route path="/dashboard">
        <DashboardRoute component={MyResumesPage} />
      </Route>

      <Route path="/dashboard/templates">
        <DashboardRoute component={TemplatesPage} />
      </Route>

      <Route path="/dashboard/ai-match">
        <DashboardRoute component={AIMatchPage} />
      </Route>

      <Route path="/dashboard/settings/:category">
        {(params) => (
          <DashboardRoute component={() => <SettingsPage category={params.category} />} />
        )}
      </Route>

      <Route path="/editor">
        <ProtectedRoute component={EditorPage} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main App Component
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* We removed AuthProvider because ClerkProvider in main.tsx handles it now */}
      <ResumeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ResumeProvider>
    </QueryClientProvider>
  );
}

export default App;