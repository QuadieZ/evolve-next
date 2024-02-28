import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        brand: {
            primary: "#00C700",
            contrast: "#FFFFFF",
            hoverPrimary: "#12BB12",
            secondary: '#8AE99C'
        },
        background: {
            primary: "#FFFFFF"
        },
        border: {
            item: '#E6E6E6'
        }
    }
})