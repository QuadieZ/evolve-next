import { CategorySelectorProps, ContainerProps, ImageBannerProps, ProductsListProps, ShopNameProps } from "@/components";

export type ProductData = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

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

export type ShopLayout = 'MINIMAL' | 'CREATIVE' | 'CLEAR'
export type ShopProductCardLayout = 'FULL' | 'COMPACT'
export type ContainerDataProps = Omit<ContainerProps, 'children'> & {
    children: Component[]
}

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
} | {
    name: 'Container'
    props: ContainerDataProps
} | {
    name: 'ImageBanner'
    props: ImageBannerProps
} | {
    name: 'ProductsList'
    props: ProductsListProps
}

export type ComponentMap = {
    [key: string]: Component[]
}

export type ComponentType = Component['name']
export type ComponentProps = ShopNameProps | CategorySelectorProps | ContainerDataProps | ImageBannerProps | ProductsListProps

export * from './dnd'