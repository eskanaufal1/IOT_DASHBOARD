import { Layout, ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store/store";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "../context/userContext";
import { deviceDataApi } from "./features/apiSLice";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Layout style={{ minHeight: "100vh" }}>
            <RouterContent />
          </Layout>
        </UserContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function RouterContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/logout" element={<LoginPage />} />
      <Route path="/main/*" element={<MainPage />} />
    </Routes>
  );
}
export default App;
