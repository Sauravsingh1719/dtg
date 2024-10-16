import dbConnect from '@/lib/dbConnect';  
import Meeting from '@/model/Meeting';

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { id } = await req.json(); // Get the meeting ID from the request body

    await Meeting.findByIdAndDelete(id); // Delete the meeting from the database

    return new Response(JSON.stringify({ message: 'Meeting deleted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete meeting' }), { status: 500 });
  }
}
