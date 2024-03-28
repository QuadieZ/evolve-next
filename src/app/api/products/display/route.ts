import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const id = body.id

    console.log(body, id)

    try {
        const resp = await fetch(process.env.NEXT_PUBLIC_LINE_API_ENDPOINT + "/myshop/v1/products/" + id + '/display-status/onsale', {
            method: 'POST',
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_LINE_API_KEY!,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        if (!resp.ok) {
            throw new Error('Failed to update product');
        }
        return NextResponse.json(
            {
                message: "Products updated successfully",
            },
            {
                status: 200
            }
        );
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {
                error: "Failed to update product",
                errorMessage: err
            },
            {
                status: 500
            }
        );
    }
}