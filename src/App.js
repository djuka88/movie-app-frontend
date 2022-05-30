import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth";
import Router from "./components/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
            <Router />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
    </div>
  );
}

export default App;
