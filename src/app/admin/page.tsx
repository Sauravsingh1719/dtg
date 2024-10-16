"use client";
import React, { useEffect, useState } from 'react';
import { Meeting } from '@/types/Meeting';
import PostsList from './posts/page';
import TestimonialList from './testimonial/page';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ToastContainer } from '@/components/ToastContainer';




const AdminPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showAllButton, setShowAllButton] = useState(false);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  const { toast, toasts, removeToast } = useToast();

  useEffect(() => {
    const fetchMeetings = async () => {
      const response = await fetch('/api/get-meetings');
      const data: Meeting[] = await response.json();
      setMeetings(data);
      setFilteredMeetings(data); // Initialize filteredMeetings to show all
    };

    // Fetching meetings data
    fetchMeetings();

    // Fetching subscriber emails
    const fetchSubscribers = async () => {
      const response = await fetch('/api/get-subscribers');
      const data = await response.json();
      setSubscribers(data);
    };

    fetchSubscribers();
  }, []);

  // Function to fetch email suggestions based on user input
  const fetchEmailSuggestions = (query: string) => {
    const suggestions = meetings
      .map((meeting) => meeting.workMail)
      .filter((email) => email.toLowerCase().includes(query.toLowerCase()));
    setEmailSuggestions(suggestions);
  };

  // Function to handle search
  const handleSearch = () => {
    const filtered = meetings.filter((meeting) =>
      meeting.workMail.toLowerCase() === searchQuery.toLowerCase()
    );
    setFilteredMeetings(filtered);
    setShowAllButton(true); 
  };

  // Function to reset and show all meetings
  const handleShowAll = () => {
    setFilteredMeetings(meetings);
    setSearchQuery('');
    setShowAllButton(false); 
  };

  const updateMeetingStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/update-meeting-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update meeting status');
      }

      const updatedMeeting = await response.json();

      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting._id === updatedMeeting._id ? updatedMeeting : meeting
        )
      );
      setFilteredMeetings((prevFiltered) =>
        prevFiltered.map((meeting) =>
          meeting._id === updatedMeeting._id ? updatedMeeting : meeting
        )
      );
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };

  const handleDeleteMeeting = async () => {
    if (!selectedMeetingId) return;

    try {
      const response = await fetch('/api/delete-meeting', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedMeetingId }),
      });
      if(response.ok){
        toast({
          title: 'Success!',
          description: 'Your meeting has been deleted succesfully',
          type: 'success',
        });
        router.refresh()
      }

      if (!response.ok) {
        throw new Error('Failed to delete meeting');
      }

      const deletedMeeting = await response.json();
      setMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting._id !== deletedMeeting._id)
      );
      setFilteredMeetings((prevFiltered) =>
        prevFiltered.filter((meeting) => meeting._id !== deletedMeeting._id)
      );
    } catch (error) {
      console.error('Error deleting meeting:', error);
    } finally {
      setShowDeleteDialog(false);
      setSelectedMeetingId(null);
    }
  };

  return (
    <div className="admin-container mx-[15%] py-20">
      <h1 className='font-extrabold text-5xl'>Admin Dashboard</h1>
      <div>
        <div>
          <hr className='w-full my-5 border-gray-500'></hr>
        </div>
        <div className='flex flex-col gap-3'>
          <h2 className='font-bold text-2xl '>Meeting Requests</h2>
          <p>Manage meetings effortlessly! Filter by email, and track meetings as upcoming, in progress, or completed to stay organized and efficient.</p>
        </div>
        {/* Search Input */}
        <div className='flex flex-row gap-3 my-5'>
          <div>
            <Input
              type="text"
              placeholder="Search by email"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchEmailSuggestions(e.target.value);
              }}
              list="email-suggestions"
            />
          </div>
          <datalist id="email-suggestions">
            {emailSuggestions.map((email, index) => (
              <option key={index} value={email} />
            ))}
          </datalist>
          <div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        {/* Meeting Requests Table */}
        {filteredMeetings.length === 0 ? (
          <p>No Meetings found</p>
        ) : (
          <Table>
            <TableCaption>A list of your upcoming meetings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeetings.map((meeting) => (
                <TableRow key={meeting._id}>
                  <TableCell className="font-medium">
                    {`${meeting.firstName.charAt(0).toUpperCase() + meeting.firstName.slice(1)} ${meeting.lastName.charAt(0).toUpperCase() + meeting.lastName.slice(1)}`}
                  </TableCell>
                  <TableCell>{meeting.workMail}</TableCell>
                  <TableCell>{meeting.phoneNumber}</TableCell>
                  <TableCell>{meeting.companyName}</TableCell>
                  <TableCell>{meeting.status}</TableCell>
                  <TableCell className="text-right">
                    <select
                      value={meeting.status}
                      onChange={(e) => updateMeetingStatus(meeting._id, e.target.value)}
                      className="border rounded-md px-2 py-1"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                    <Button
                      onClick={() => {
                        setSelectedMeetingId(meeting._id);
                        setShowDeleteDialog(true);
                      }}
                      className="ml-2"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Show All Button */}
        {showAllButton && (
          <Button onClick={handleShowAll} className='my-5'>Show All</Button>
        )}

        {/* Subscriber Emails */}
        <hr className='my-10' />
        <h2 className='font-bold text-2xl mb-5'>Subscribed Emails</h2>
        {subscribers.length === 0 ? (
          <p>No subscribed emails found</p>
        ) : (
          <Table>
            <TableCaption>A list of subscribed emails.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell>{subscriber.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        <hr className='border-gray-200 my-5'/>
        <div className='my-10'>
          <PostsList />
        </div>
        <hr className='border-gray-200 my-5'/>
        <div className='my-10'>
          <h1 className='font-bold text-2xl my-5'>Testimonial</h1>
          <TestimonialList />
        </div>
      </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Meeting</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this meeting? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMeeting}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default AdminPage;

