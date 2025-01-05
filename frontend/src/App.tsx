import { Routes, Route, Navigate } from "react-router-dom";

import { useAppContext } from "./contexts/AppContext";

import Layout from "./layouts/Layout";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import AddHotelPage from "./pages/AddHotelPage";
import MyHotelsPage from "./pages/MyHotelsPage";
import EditHotelPage from "./pages/EditHotelPage";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>Home page</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <p>Search page</p>
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignInPage />
          </Layout>
        }
      />
      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotelPage />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotelsPage />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotelPage />
              </Layout>
            }
          />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
