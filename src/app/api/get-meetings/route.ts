// app/api/get-meetings/route.ts
import dbConnect from '@/lib/dbConnect';
import Meeting from '@/model/Meeting';

export async function GET() {
  try {
    await dbConnect();
    const meetings = await Meeting.find(); // Fetch all meetings from the database
    return new Response(JSON.stringify(meetings), { status: 200 });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch meetings' }), { status: 500 });
  }
}
