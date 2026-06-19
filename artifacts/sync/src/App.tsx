import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";

import Home from "@/pages/Home";
import Nova from "@/pages/Nova";
import Echo from "@/pages/Echo";
import Storyline from "@/pages/Storyline";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollManager() {
  useLenis();
  return null;
}

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/nova" component={Nova} />
        <Route path="/echo" component={Echo} />
        <Route path="/storyline/fractured-timelines" component={Storyline} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollManager />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
