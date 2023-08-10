import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Chats, Favorites, Settings, Product, Profile, CreateProduct, Login, Register, NotFound } from './pages';
import DefaultLayout from "./layouts/DefaultLayout";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/wiadomosci" element={<Chats />} />
            <Route path="/obserwowane" element={<Favorites />} />
            <Route path="/konto" element={<Settings />} />
            <Route path="/oferta/:id" element={<Product />} />
            <Route path="/profil/:id" element={<Profile />} />
            <Route path="/utworz" element={<CreateProduct />} />
            <Route path="/edytuj/:id" element={<CreateProduct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
