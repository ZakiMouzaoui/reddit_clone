"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Providers } from "./providers";
import { RecoilRoot } from "recoil";

export const metadata = {
  title: "Reddit Clone",
  description: "A reddit clone app generated using next js",
};

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Providers children={children}></Providers>
          </RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}
