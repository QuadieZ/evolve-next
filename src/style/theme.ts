import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        brand: {
            primary: "#00C700",
            contrast: "#FFFFFF",
            hoverPrimary: "#12BB12",
            secondary: '#8AE99C',
            description: '#A6A6A6',
            divider: "#D0D0D0"
        },
        background: {
            primary: "#FFFFFF"
        },
        border: {
            item: '#E6E6E6'
        }
    }
})