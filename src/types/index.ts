import { CategorySelectorProps, ShopNameProps } from "@/components";

export type ProfileData = {
    display_name: string;
    pictureUrl: string
    userId: string
}

export type ShopPreviewData = {
    shopId: string
    shopName: string
    shopPictureUrl?: string
    shopDescription?: string
    ownerId: string
}

export type ShopDetailData = {
    shopId: string
    shopName: string
    shopDescription?: string
    shopPictureUrl?: string
    shopRating?: number
    hasOnboarded?: boolean
    ownerId: string
    shopStyle?: ShopStyle
}

export type ShopLayout = 'MINIMAL' | 'COMPACT' | 'CLEAR'
export type ShopProductCardLayout = 'FULL' | 'COMPACT'

export type ShopStyle = {
    colors: {
        primaryColor: string
        secondaryColor: string
    },
    logo: File | null,
    shopLayout: ShopLayout
    shopProductCardLayout: ShopProductCardLayout
}

export type Component = {
    name: "ShopTitle"
    props: ShopNameProps
} | {
    name: "ProductCategories"
    props: CategorySelectorProps
} |
{
    name: "Divider"
}

export type ComponentType = Component['name']
export type ComponentProps = ShopNameProps | CategorySelectorProps