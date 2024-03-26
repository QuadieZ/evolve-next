import { ProductData } from "./components";
import { Component } from "./types";

export const allComponents: Component[] = [
    {
        name: "ShopTitle",
        props: {
            name: "Your Store",
            description: "Be the real you",
        },
    },
    {
        name: "Divider"
    },
    {
        name: "ImageBanner",
        props: {
            src: "https://picsum.photos/300/500",
        },
    },
    {
        name: 'ProductCategories',
        props: {
            categories: [
                {
                    title: "ALL",
                    isSelected: true,
                },
                {
                    title: "Summer",
                    src: "https://picsum.photos/300/500",
                },
                {
                    title: "Winter",
                    src: "https://picsum.photos/300/500",
                },
            ],
        },

    },
    {
        name: "ProductsList",
        props: {
            products: [
                {
                    title: 'Product 1',
                    price: 100,
                    image: 'https://picsum.photos/300/500',
                    description: 'This is a product description'
                },
                {
                    title: 'Product 2',
                    price: 100,
                    image: 'https://picsum.photos/300/500',
                    description: 'This is a product description'
                },
                {
                    title: 'Product 3',
                    price: 100,
                    image: 'https://picsum.photos/300/500',
                    description: 'This is a product description'
                }
            ]
        },
    }
]

export const mockProducts: ProductData[] = [
    {
        title: 'Product 1',
        price: 100,
        image: 'https://picsum.photos/300/500',
        description: 'This is a product description'
    },
    {
        title: 'Product 2',
        price: 100,
        image: 'https://picsum.photos/300/500',
        description: 'This is a product description'
    },
    {
        title: 'Product 3',
        price: 100,
        image: 'https://picsum.photos/300/500',
        description: 'This is a product description'
    }
];

export const mockComponents: Component[] = [
    {
        name: "ShopTitle",
        props: {
            name: "Your Store",
            description: "Be the real you",
        },
    },
    {
        name: "Divider",
    },
    {
        name: "ProductCategories",
        props: {
            categories: [
                {
                    title: "ALL",
                    isSelected: true,
                },
                {
                    title: "Summer",
                    src: "https://picsum.photos/300/500",
                },
                {
                    title: "Winter",
                    src: "https://picsum.photos/300/500",
                },
            ],
        },
    },

];