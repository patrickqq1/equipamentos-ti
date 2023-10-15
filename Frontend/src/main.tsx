import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthContext } from "./services/context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContext>
    </ChakraProvider>
  </React.StrictMode>
);
