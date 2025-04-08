import { NextResponse } from 'next/server';
import runX from '../services';

export async function GET() {
  try {
    await runX();
    return NextResponse.json({ message: 'X automation started successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error running X automation:', error);
    return NextResponse.json(
      { error: 'Failed to run X automation' },
      { status: 500 }
    );
  }
} 