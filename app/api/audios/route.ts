import { NextRequest, NextResponse } from 'next/server';
import audiosData from '@/data/audios.json';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level')?.toLowerCase();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '12', 10);

    if (!level) {
      return NextResponse.json(
        { error: 'Level parameter is required' },
        { status: 400 }
      );
    }

    const filteredAudios = audiosData.filter(
      (audio) => audio.level === level
    );

    const total = filteredAudios.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredAudios.slice(startIndex, endIndex);

    const response = NextResponse.json({
      items: paginatedItems,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });

    response.headers.set('Cache-Control', 'public, max-age=300');

    return response;
  } catch (error) {
    console.error('Error fetching audios:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
