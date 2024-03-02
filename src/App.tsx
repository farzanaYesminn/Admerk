import "styles/App.css";
import { router } from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { theme } from "lib/chakra/Theme";
import AuthProvider from "./lib/context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

function App() {
    return (
        <AuthProvider>
            <HelmetProvider>
                <ChakraProvider theme={theme}>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </HelmetProvider>
        </AuthProvider>
    );
}

export default App;
