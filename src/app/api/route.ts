import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Ask500Titans API is running' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic request validation
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    // Echo the request for testing
    return NextResponse.json({
      message: 'Request received successfully',
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }
}