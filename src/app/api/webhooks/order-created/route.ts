import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Handle the incoming order event
  console.log('Order created:', body);

  return NextResponse.json({ success: true });
}
