// types/Meeting.ts
export interface Meeting {
    _id: string;
    firstName: string;
    lastName: string;
    workMail: string;
    phoneNumber: string;
    companyName: string;
    status: string; // You can also define a specific union type if you have specific statuses
    // Add any other fields you might have
  }
  
  // Define the BlogPost interface
export interface BlogPost {
  title: string;
  author: string;
  content: string;
  // Add any other fields that your BlogPost model contains
}
