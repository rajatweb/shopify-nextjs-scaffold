
// import { shopify } from '@/lib/shopify';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest, { params }) {
//   const session = await shopify.auth.getOfflineSession(process.env.SHOPIFY_SHOP || '');
//   const client = new shopify.clients.Rest({ session });
  
//   const product = await client.get({
//     path: `products/${params.id}`,
//   });

//   return NextResponse.json({ product: product.body.product });
// }

export async function GET() {

    return "Ok";
}