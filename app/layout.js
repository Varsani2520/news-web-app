"use client";

import { Container } from "@mui/material";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { StoreProvider } from "./storeProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <div className="mt-20">
            <Container maxWidth="xl">{children}</Container>
          </div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
