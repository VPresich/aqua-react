
<!-- prettier-ignore-start -->

Backend:
https://aqua-rest-api.onrender.com (author: V. Aleksandrova)

Design Mokup: 
https://www.figma.com/design/8Iz9XYQhLNWPDUA9S3BGC1/AquaTrack?node-id=54-562&t=m5QGGqIINNWSRdKQ-0

Water Tracker App
The Water Tracker App is a user-friendly web application designed to help users track their daily water intake and maintain a healthy hydration routine. The app allows users to set a daily water consumption goal, log their water intake, and monitor their progress through intuitive visual indicators.

The application provides a seamless user experience with responsive design, optimized images, and accessible UI components. It includes authentication features for secure user access and personalized tracking.

Water Tracking Functionality
The core functionality of the app revolves around tracking water consumption.

Home Page (/) (Public)
Contains a Welcome Section with the app's logo and description
Includes a Call to Action with links to Sign Up and Sign In pages

Sign Up Page (/signup) (Public)
Allows new users to create an account
Form fields: Email, Password, Repeat Password
Uses react-hook-form and Yup for validation
Errors are displayed, and invalid data is not sent to the backend
On success: User is automatically logged in and redirected to Tracker Page

Sign In Page (/signin) (Public)
Allows existing users to log in
Form fields: Email, Password
Uses validation for secure authentication
If login is successful, redirects to Tracker Page

Tracker Page (/tracker) (Private)
The main dashboard where users can monitor their daily water intake. It consists of two sections:

Water Main Info
Displays the total water intake for the day
Shows the daily goal progress bar
Includes an "Add Water" button to log new entries

Water Detailed Info
Provides a deeper analysis of water intake over time. Includes:

User Panel: Displays user's name and avatar with a dropdown menu for settings/logout
Daily Info: Shows the log of water intake for a selected day
Month Info: Displays a calendar view with hydration statistics

Additional Functionalities
User Settings
Users can update their profile picture, name, email, weight, activity level, and daily water goal
Water consumption recommendation is provided based on user data

Calendar & History Tracking
Users can select a specific date to view water intake logs
Monthly view provides hydration trends and statistics
Interactive Features
Modals for adding/editing water intake
Validation to prevent incorrect entries
Real-time updates using Redux

Technologies Used
Vite - Fast and modern frontend tooling.
React - Component-based UI development.
Redux - State app.
React Router - Client-side routing.
Axios - HTTP requests.
CSS Modules / Styled Components.


<!-- prettier-ignore-end -->
