import "./globals.css";
import GeneralLayout from "@/components/layout/GeneralLayout";
import ReduxProvider from "@/components/reduxProvider/Provider";
import SessionProviderWrapper from "@/components/sessionProviderWrapper/SessionProvider";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            <GeneralLayout>
              {children}
            </GeneralLayout>
          </SessionProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
