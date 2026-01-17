import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/authContext";
import { ResumeProvider } from "@/lib/resumeContext";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MyResumesPage from "@/pages/dashboard/index";
import TemplatesPage from "@/pages/dashboard/templates";
import AIMatchPage from "@/pages/dashboard/ai-match";
import EditorPage from "@/pages/editor";
import SettingsPage from "@/pages/dashboard/settings";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  
  return <Component />;
}

function DashboardRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  
  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <LoginPage />}
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
        {(params) => <DashboardRoute component={() => <SettingsPage category={params.category} />} />}
      </Route>
      <Route path="/editor">
        <ProtectedRoute component={EditorPage} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ResumeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ResumeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
