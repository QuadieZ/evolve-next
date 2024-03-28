import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const body = await req.json()
    const id = body.id

    console.log('id', id)
    try {
        const resp = await fetch(process.env.NEXT_PUBLIC_LINE_API_ENDPOINT + "/myshop/v1/products/" + id, {
            method: 'DELETE',
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
                message: "Products delete successfully",
            },
            {
                status: 200
            }
        );
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {
                error: "Failed to delete product",
                errorMessage: err
            },
            {
                status: 500
            }
        );
    }
}