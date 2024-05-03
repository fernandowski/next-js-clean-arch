import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import theme from "@/theme";
import {ThemeProvider} from "@mui/material";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Todo App",
    description: "Organize your life",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
