import "./globals.css";
import Header from "@/components/header/Header";
import SessionProviderWrapper from "@/components/sessionProviderWrapper/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Toaster } from "sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReduxProvider from "@/components/reduxProvider/Provider";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Deewas Shop",
  description: "This is a ecommerce project developed by Deewas Tamang",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="font-urbanist w-full bg-main-bg bg-repeat text-darkText">
        <ReduxProvider>
          <SessionProviderWrapper session={session}>
            <Toaster position="bottom-left" />
            <Header />
            {children}
            <Footer />
          </SessionProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
