import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./components/auth/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Leads from "@/pages/leads";
import Messages from "@/pages/messages";
import Chatbots from "@/pages/chatbots";
import Analytics from "@/pages/analytics";
import Contacts from "@/pages/contacts";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/leads" component={Leads} />
      <Route path="/dashboard/messages" component={Messages} />
      <Route path="/dashboard/chatbots" component={Chatbots} />
      <Route path="/dashboard/analytics" component={Analytics} />
      <Route path="/dashboard/contacts" component={Contacts} />
      <Route path="/dashboard/settings" component={Settings} />
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
