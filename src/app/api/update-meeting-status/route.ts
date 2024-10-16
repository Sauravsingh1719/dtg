import dbConnect from '@/lib/dbConnect'; 
import Meeting from '@/model/Meeting'; 

export async function PUT(req: Request) {
  await dbConnect(); 

  try {
    const { id, status } = await req.json();

    
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    if (!updatedMeeting) {
      return new Response(JSON.stringify({ error: 'Meeting not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedMeeting), { status: 200 });
  } catch (error) {
    console.error('Error updating meeting:', error);
    return new Response(JSON.stringify({ error: 'Failed to update meeting' }), { status: 500 });
  }
}
