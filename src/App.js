import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth";
import Router from "./components/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";

export const FilterContext = createContext();

function App() {
  const queryClient = new QueryClient();
  const [filters, setFilters] = useState({});
  const [searchField, setSearchField] = useState("");
  const [genresCheckboxes, setGenresCheckboxes] = useState([]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <FilterContext.Provider
              value={[
                filters,
                setFilters,
                searchField,
                setSearchField,
                genresCheckboxes,
                setGenresCheckboxes,
              ]}
            >
              <Navbar />
              <Router />
            </FilterContext.Provider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
