import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Wrapper, Footer } from "./components";
import {
  HomePage,
  LoginPage,
  ProfilePage,
  ProductPage,
  SignupPage,
} from "./pages";
import {AppProvider} from './utils/AppContext';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./styles/global.css";

function App() {
  
  return (
    <AppProvider>
      <BrowserRouter>
        <Wrapper>
          <Header />
          <div className="pt-3 px-4">
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/product"
                element={
                  <ProductPage />
                }
              />
            </Routes>
          </div>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
