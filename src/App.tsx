import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import AuthCheck from "./components/AuthCheck";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthCheck>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </AuthCheck>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
