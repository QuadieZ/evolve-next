import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(req: any, res: any) {
    console.log(process.env.NEXT_PUBLIC_LINE_API_ENDPOINT + "/myshop/v1/products")
    try {
        const data = await fetch(process.env.NEXT_PUBLIC_LINE_API_ENDPOINT + "/myshop/v1/products", {
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_LINE_API_KEY!,
                'Access-Control-Allow-Origin': '*',
            }

        })
        if (data.ok) {
            console.log(data)
            const products = await data.json()
            console.log(products)
            return NextResponse.json(
                {
                    products
                },
                {
                    status: 200
                }
            )
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error: "Failed to get products",
                errorMessage: error
            },
            {
                status: 500
            }
        )
    }
}