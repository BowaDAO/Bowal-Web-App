import React from "react";
import { Categories, Home, Main } from "./pages";
import { loader as categoriesLoader } from "./pages/categories";
import { loader as homeLoader } from "./pages/Home";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Login, SignUp } from "./logins";
import { action as loginAction } from "./logins/Login";
import { action as signupAction } from "./logins/SignUp";
import { useGlobalContext } from "./Context/context";
import { PreLoader, NotFound, ErrorBoundary } from "./Components";
import RequireAuth from "./Firebase/RequireAuth";
import Sellers, { loader as sellersLoader } from "./Vendor/Sellers/Sellers";
import Info from "./Vendor/Sellers/Info";
import Reviews from "./Vendor/Sellers/Reviews";
import Shop from "./Vendor/Sellers/Shop";
import ShopHost, { loader as shopHostLoader } from "./Vendor/Sellers/ShopHost";
import SavedBusinesses from "./Pages/SavedBusinesses";

const routerEl = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        path="login"
        element={<Login />}
        action={loginAction}
        errorElement={<ErrorBoundary />}
      />

      <Route
        path="signup"
        element={<SignUp />}
        action={signupAction}
        errorElement={<ErrorBoundary />}
      />

      <Route path="main" element={<Main />} />

      <Route element={<RequireAuth />}>
        <Route
          index
          element={<Home />}
          loader={homeLoader}
          errorElement={<ErrorBoundary />}
        />

        <Route
          path="categories"
          element={<Categories />}
          loader={categoriesLoader}
          errorElement={<ErrorBoundary />}
        />

        <Route
          path="/:category"
          element={<Sellers />}
          loader={sellersLoader}
          errorElement={<ErrorBoundary />}
        />

        <Route
          path="/:category/:id"
          element={<ShopHost />}
          loader={shopHostLoader}
          errorElement={<ErrorBoundary />}
        >
          <Route index exact element={<Shop />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="info" element={<Info />} />
        </Route>

        <Route path="savedbusinesses" element={<SavedBusinesses />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  const { preLoading } = useGlobalContext();

  return (
    <div>
      {preLoading ? <PreLoader /> : <RouterProvider router={routerEl} />}
    </div>
  );
};

export default App;
