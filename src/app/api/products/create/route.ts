import supabase from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

type AddProductPayload = {
    name: string;
    categoryId: number;
    image: string[];
    code: string;
    variant: {
        price: number;
        inventory: number;
        weight: number;
    };
};

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json() as AddProductPayload[];

    const response = []
    try {
        for (const product of data) {
            const resp = await fetch(process.env.NEXT_PUBLIC_LINE_API_ENDPOINT + "/myshop/v1/products", {
                method: 'POST',
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_LINE_API_KEY!,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    name: product.name,
                    categoryId: product.categoryId,
                    imageUrls: product.image,
                    code: product.code,
                    variants: [
                        {
                            price: product.variant.price,
                            onHandNumber: product.variant.inventory,
                            weight: product.variant.weight
                        }
                    ]
                })
            });

            if (!resp.ok) {
                console.log((resp as any).info);
                throw new Error('Failed to create product');
            }

            response.push(await resp.json());
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: "Failed to create product",
                errorMessage: error
            },
            {
                status: 500
            }
        );
    }

    return NextResponse.json(
        {
            message: "Products created successfully",
            response
        },
        {
            status: 200
        }
    );
}
