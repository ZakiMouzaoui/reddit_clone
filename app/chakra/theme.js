import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      brand: {
        100: "f74300",
      },
      //   fonts: {
      //     body: "Open Sens, sans-serif",
      //   },
      //   styles: {
      //     global: {
      //       "html, body": {
      //         color: "gray.600",
      //         lineHeight: "tall",
      //       },
      //       a: {
      //         color: "teal.500",
      //       },
      //     },
      //   },
    },
  },
});
