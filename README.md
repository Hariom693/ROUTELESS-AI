# PROMPT
PRODUCT REQUIREMENTS DOCUMENT (PRD)

ROUTELESS AI – THE LAST MILE

AI-Powered Rural Student Transportation Management System

Project Category: Artificial Intelligence | Smart Transportation | Rural Development
Project Type: Responsive Web Application
Prepared For: Hackathon Project
PRD Version: 1.0
Date: 13 November 2026

---

1. Project Overview

ROUTELESS AI – THE LAST MILE is an AI-assisted smart transportation management platform designed to solve transportation difficulties faced by students living in rural villages.

Many rural students depend on a limited number of government buses to travel to schools and colleges. Bus cancellations, overcrowding, route disruptions and insufficient transportation facilities create difficulties for students.

ROUTELESS AI aims to solve these problems by connecting students with available public transportation, private transportation and alternative travel options.

The platform uses AI-assisted demand prediction, intelligent route optimization, emergency vehicle allocation and an interactive transportation map to improve accessibility and reduce travel delays.

2. Problem Statement

Rural students often face transportation challenges because of:

- Limited availability of government buses.
- Overcrowded buses and insufficient seating capacity.
- Unexpected bus breakdowns and route disruptions.
- Lack of information about available transportation.
- Poor connectivity between villages and educational institutions.
- Limited alternative transportation options.
- Lack of intelligent transportation planning.

There is no unified platform that provides real-time transportation information and intelligent alternative travel recommendations for rural students.

3. Proposed Solution

ROUTELESS AI provides a centralized transportation platform that connects students, administrators and drivers.

The system will:

1. Display available public and private transportation.
2. Predict transportation demand using AI.
3. Optimize student allocation according to vehicle capacity.
4. Identify alternative routes and transportation options.
5. Simulate emergency situations such as bus breakdowns.
6. Provide estimated travel time and traffic information.
7. Offer an AI chatbot for transportation-related queries.

Main Objective: Ensure that students can find a suitable way to reach their educational institutions even when regular transportation services are unavailable.

4. Project Objectives

- Improve rural student transportation accessibility.
- Reduce dependency on a limited number of buses.
- Utilize available vehicle capacity efficiently.
- Minimize travel delays and unnecessary distances.
- Predict future transportation requirements.
- Provide emergency transportation assistance.
- Improve communication between students, drivers and administrators.
- Build an affordable and scalable transportation management system.

5. Target Users

The application will support three primary user roles.

5.1 Student

Students can:

- Register and log in securely.
- Search transportation between villages and colleges.
- View available buses and private vehicles.
- Check bus numbers and seating capacity.
- View pickup points and estimated travel time.
- Check traffic conditions.
- Find alternative transportation.
- Track their selected vehicle through an animated map marker.
- Interact with the AI chatbot.

5.2 Admin

Administrators can:

- Access the admin dashboard.
- Monitor total registered students.
- Monitor public and private vehicles.
- View occupied and available seats.
- Monitor transportation demand.
- View AI demand predictions.
- Manage vehicles, routes and drivers.
- Simulate emergency bus breakdowns.
- Monitor alternative vehicle allocation.
- View transportation analytics and reports.

5.3 Driver

Drivers can:

- Register and log in through an authorized account.
- View assigned routes.
- View pickup points and student allocation.
- View assigned student counts.
- Update vehicle availability.
- Update trip status.
- Share vehicle location when location tracking is enabled.
- Receive route disruption and emergency notifications.

6. Core Application Modules

Module 1: Authentication and User Management

Implement secure authentication for all three user categories.

Required features:

- Student registration and login.
- Admin login.
- Driver login.
- Role-based dashboard redirection.
- Logout functionality.
- Password reset.
- User profile management.
- Login session management.

Role-based access:

User| Dashboard| Permissions
Student| Student Dashboard| Search and book/request transport
Admin| Admin Dashboard| Manage entire system
Driver| Driver Dashboard| Manage assigned trips and vehicle status

Every account must have a unique system user ID.

Record the following information:

- User ID
- User role
- Login date
- Login time
- Last login time
- Account creation timestamp
- Session status

All timestamps should be stored in UTC and displayed according to the user's local timezone.

Administrators should have access to appropriate login and activity audit records.

Module 2: Student Dashboard

Create a modern student dashboard.

Dashboard components:

- Welcome message with student profile.
- Village and college destination selection.
- Source and destination search.
- Available transportation summary.
- Available seats.
- Estimated travel duration.
- Pickup and drop-off points.
- Current traffic status.
- Alternative transportation suggestions.
- Recent searches and trip status.

Students should be able to search for a specific route and immediately view available transportation options.

Module 3: Admin Dashboard

Create a centralized transportation management dashboard.

Dashboard statistics:

- Total registered students.
- Total available buses.
- Total private vehicles.
- Total occupied seats.
- Total available seats.
- Current transportation demand.
- Number of active routes.
- Number of emergency allocations.

Dashboard visualizations:

- Daily transportation demand chart.
- Public vs private transportation chart.
- Vehicle utilization chart.
- Available vs occupied seats.
- Route-wise student distribution.
- Predicted transportation demand.

Administrators should be able to monitor the entire transportation network from one dashboard.

Module 4: Separate Public and Private Transportation

The application must have two separate transportation categories.

A. Public Transportation

Display:

- Government bus number.
- Bus route number.
- Source and destination.
- Pickup points.
- Total seating capacity.
- Available seats.
- Occupied seats.
- Estimated arrival time.
- Traffic conditions.
- Current availability status.

B. Private Transportation

Display:

- Private bus information.
- Registered auto-rickshaws.
- Shared transportation.
- Local private vehicle services.
- Available seating capacity.
- Estimated cost, when available.
- Pickup location.
- Estimated travel time.
- Vehicle availability.

Students should be able to compare both categories.

Module 5: Smart Route Search

Create a prominent search feature on the student dashboard.

Search inputs:

- Source village.
- Destination college.
- Travel date.
- Preferred departure time.

Search results must display:

Information| Description
Route| Source to destination
Bus number| Registered vehicle number
Transport type| Public or private
Total capacity| Maximum vehicle seats
Available seats| Remaining seats
Occupied seats| Currently allocated seats
Travel time| Estimated journey duration
Pickup point| Boarding location
Traffic| Current or simulated traffic
Status| Available, full or unavailable

Also display the total number of available buses on the searched route.

If no direct transportation is available, the system must suggest alternative transportation.

Module 6: AI Demand Prediction

Develop an AI-powered demand prediction system.

Purpose: Predict how many students will require transportation during upcoming periods.

Working:

1. Collect sample historical transportation data.
2. Analyze daily student travel patterns.
3. Identify high-demand routes.
4. Predict future transportation demand.
5. Compare predicted demand with available vehicle capacity.
6. Identify routes that may experience overcrowding.

Example:

Route| Predicted students| Available seats| Shortage
Village A – College X| 120| 90| 30
Village B – College Y| 70| 80| 0
Village C – College Z| 100| 60| 40

The AI should provide an explanation of its prediction, such as historical demand, weekday patterns and previous occupancy.

Display:

- Predicted student demand.
- Available vehicle capacity.
- Expected shortage.
- High-demand routes.
- Recommended additional vehicles.

Predictions must be clearly identified as AI-generated estimates rather than confirmed passenger counts.

Module 7: Smart Route Optimization

Develop an intelligent vehicle allocation system.

Main functionalities:

- Group students travelling in similar directions.
- Identify the nearest suitable pickup points.
- Allocate students to available vehicles.
- Consider vehicle seating capacity.
- Minimize unnecessary travel distance.
- Reduce delays and overcrowding.
- Recommend alternative routes.

Important condition:

The system must never allocate more students than the maximum vehicle capacity.

Example:

A bus has a capacity of 40 students.

If 55 students require transportation, the system should allocate:

- Bus 1: 40 students.
- Alternative vehicle: 15 students.

The allocation algorithm must consider capacity, route compatibility and vehicle availability.

Module 8: Emergency Simulation – Bus Breakdown

This is one of the major demonstration features of ROUTELESS AI.

Create an administrator button:

SIMULATE BUS BREAKDOWN

Working process:

1. Administrator selects an active bus.
2. Clicks the breakdown simulation button.
3. The selected bus status changes to unavailable.
4. Students assigned to that bus are identified.
5. AI recalculates transportation allocation.
6. Alternative buses and vehicles are identified.
7. Students are reassigned according to vehicle capacity.
8. Alternative pickup points are suggested.
9. The system displays the number of students successfully reassigned.

Before and After Comparison:

Parameter| Before| After
Available buses| 5| 4
Disrupted students| 0| 35
Students reassigned| 0| 35
Unassigned students| 0| 0

Use dynamically calculated sample values in the actual simulation.

Display:

- Failed vehicle information.
- Number of affected students.
- Alternative vehicles.
- New pickup points.
- Students rescued from disruption.
- Remaining unallocated students.

The system should not claim all students are rescued unless every affected student has a valid allocation.

Module 9: Interactive Transportation Map

Integrate an interactive map displaying:

- Sample rural villages.
- Educational institutions.
- Public bus locations.
- Private vehicle locations.
- Pickup and drop-off points.
- Main transportation routes.
- Alternative routes.

Map functionality:

- Zoom in and zoom out.
- Select a vehicle to view details.
- View route information.
- Display estimated travel time.
- Show alternative routes after disruptions.
- Display traffic conditions.

Use realistic sample geographical coordinates for the hackathon prototype.

Traffic Management System

Represent traffic conditions using the following colors:

Color| Traffic condition
Green| No or low traffic
Orange| Medium traffic
Red| Heavy traffic

Traffic information should influence travel-time estimates and alternative route recommendations.

Animated Vehicle Tracking

When a student selects a transportation option:

- Display an animated vehicle marker on the map.
- Animate the vehicle along the selected route.
- Show the current simulated location.
- Display the estimated remaining journey time.
- Update the marker during the journey.

For the prototype, use simulated vehicle movement along route coordinates. Actual live GPS tracking can be integrated when vehicle devices or driver location sharing are available.

Module 10: Alternative Transportation Recommendation

When public and private transportation are unavailable, the system must not simply display "No buses available."

Instead, suggest alternative transportation such as:

- Shared auto-rickshaws.
- Local registered vehicles.
- Community transportation.
- Shared rides with verified drivers.
- Nearby pickup points.
- Multi-stage journeys using available transport.

If no verified vehicle is available, display that no confirmed transportation option exists and suggest contacting the administrator or registered local transport providers.

Show estimated cost and travel time whenever reliable information is available.

Module 11: AI Transportation Chatbot

Integrate an AI chatbot for students, drivers and administrators.

Chatbot capabilities:

- Answer transportation-related questions.
- Search available buses.
- Find available routes.
- Provide bus numbers and seating capacity.
- Explain estimated travel times.
- Suggest alternative transportation.
- Answer pickup-point queries.
- Provide emergency transportation guidance.
- Support simple natural-language queries.

Example conversations:

Student: "Is there any bus available from my village to college?"

AI: "There are two available public buses and one private vehicle on your selected route."

Student: "What if my bus breaks down?"

AI: "I can help find alternative transportation and nearby pickup points."

The chatbot should use application data for availability answers instead of inventing bus schedules or vehicle information.

Module 12: Travel Time and Journey Status

Display estimated travel time between source and destination.

Include:

- Total distance.
- Estimated journey duration.
- Expected arrival time.
- Current traffic condition.
- Selected transportation.
- Remaining journey time.
- Journey status.

Possible statuses:

- Scheduled.
- Waiting for pickup.
- In transit.
- Delayed.
- Completed.
- Cancelled.

---

7. AI Integration and Intelligence

AI should be used for actual decision-making, not only for chatbot responses.

AI Component| Purpose
Demand Prediction| Predict future student transportation demand
Route Optimization| Find efficient routes
Vehicle Allocation| Allocate students based on available seats
Emergency Reallocation| Find replacement vehicles during breakdowns
Intelligent Recommendation| Suggest alternative transport
AI Chatbot| Understand and answer user queries

AI development approach:

- Use historical/sample data for demand prediction.
- Use optimization algorithms for vehicle allocation.
- Use route algorithms for finding suitable paths.
- Use Gemini API for natural-language chatbot responses.
- Use an AI explanation feature to explain allocation and prediction decisions.

The system must use actual application data wherever possible and clearly identify simulated information.

8. Technology Stack

The project will use Firebase for deployment and Supabase for backend services and data management.

Layer| Technology| Purpose
Frontend| React.js| Responsive web application
Styling| Tailwind CSS| Modern UI
Backend database| Supabase PostgreSQL| Store application data
Authentication| Supabase Auth| User authentication
Authorization| Role-based access control| Student, admin and driver permissions
Backend logic| Supabase Edge Functions| Secure server-side operations
Deployment| Firebase Hosting| Deploy the website
AI chatbot| Gemini API| AI conversations
Prediction| Python / ML| Demand forecasting
Maps| Leaflet + OpenStreetMap| Interactive maps
Charts| Recharts| Dashboard analytics
Version Control| GitHub| Source code management

Architecture clarification

Firebase and Supabase will have separate responsibilities:

Firebase

- Website hosting.
- Production deployment.
- HTTPS-enabled website access.
- Hosting configuration.

Supabase

- PostgreSQL database.
- Authentication.
- User roles and permissions.
- Vehicle and route management.
- Student transportation records.
- Backend processing.
- Realtime updates.
- Secure API operations.

Use Supabase Auth as the single authentication provider for all three user roles. Do not create separate authentication systems for Firebase and Supabase.

9. Database Design

The application should have the following database tables.

9.1 Users

- id
- full_name
- email
- phone
- role
- village
- created_at
- last_login_at

9.2 Vehicles

- id
- vehicle_number
- vehicle_type
- transport_category
- capacity
- available_seats
- occupied_seats
- driver_id
- availability_status

9.3 Routes

- id
- source
- destination
- distance
- estimated_duration
- route_status

9.4 Route Stops

- id
- route_id
- stop_name
- latitude
- longitude
- stop_order

9.5 Student Trips

- id
- student_id
- route_id
- vehicle_id
- pickup_point
- destination
- travel_date
- trip_status

9.6 Vehicle Locations

- id
- vehicle_id
- latitude
- longitude
- recorded_at

9.7 Demand Predictions

- id
- route_id
- predicted_students
- available_capacity
- predicted_shortage
- prediction_period
- explanation

9.8 Emergency Events

- id
- vehicle_id
- event_type
- affected_students
- reassigned_students
- unassigned_students
- created_at

9.9 Login Activity

- id
- user_id
- login_timestamp
- logout_timestamp
- session_status

9.10 Traffic Information

- id
- route_id
- traffic_level
- estimated_delay
- updated_at

All tables should use appropriate foreign keys, timestamps and database constraints.

10. Security Requirements

- Implement secure user authentication.
- Apply role-based access control.
- Use Supabase Row Level Security (RLS).
- Students should access only their permitted personal trip information.
- Drivers should access their assigned vehicle and route information.
- Only administrators should manage system-wide resources.
- Never expose API secret keys in frontend code.
- Keep Gemini API keys in secure backend environment variables.
- Validate all vehicle capacity and allocation operations on the server.
- Maintain login and administrative activity logs.

11. User Interface and Design Requirements

Design theme:

- Primary background: White.
- Secondary background: Dark Navy.
- Accent color: Green.
- Warning color: Orange.
- Emergency color: Red.

UI characteristics:

- Modern professional transportation dashboard.
- Clean cards and tables.
- Interactive map.
- Animated vehicle markers.
- Responsive navigation.
- Mobile-friendly search.
- Dashboard charts.
- Loading and error states.
- Clear status indicators.
- Accessible forms and readable typography.

Main Navigation

Student

- Home
- Search Routes
- Public Transport
- Private Transport
- My Trips
- AI Assistant
- Profile

Admin

- Overview
- Students
- Vehicles
- Routes
- AI Predictions
- Route Optimization
- Emergency Simulation
- Analytics
- Activity Logs

Driver

- Dashboard
- Assigned Route
- Student Allocation
- Vehicle Status
- Trip History
- Profile

12. Application Workflow

1. User opens ROUTELESS AI.
2. User logs in as Student, Admin or Driver.
3. System identifies the user's role.
4. User is redirected to the appropriate dashboard.
5. Student enters source and destination.
6. System searches available public and private transportation.
7. System displays bus numbers, capacity, seats, traffic and estimated travel time.
8. AI recommends the most suitable transportation option.
9. Student selects a suitable journey.
10. Vehicle movement is displayed on the interactive map.
11. If a bus breakdown occurs, the administrator can simulate the emergency.
12. AI reallocates affected students.
13. Students receive updated transportation information.

13. Expected Hackathon Demonstration

The project should demonstrate the following scenarios.

Scenario 1: Normal Transportation

A student searches for a bus from Village A to College X. The system displays available buses, seat capacity, traffic and estimated travel time.
Scenario 2: High Transportation Demand

The AI predicts that 120 students require transportation, but only 90 seats are available. The admin dashboard displays the shortage and recommends additional vehicles.

Scenario 3: Bus Breakdown

The administrator selects a bus and clicks SIMULATE BUS BREAKDOWN. The system marks the bus unavailable and reallocates affected students to other available vehicles.

Scenario 4: No Transportation Available

The student searches for a route with no public or private buses. The system recommends verified local alternatives or community transportation.

Scenario 5: AI Chatbot

The student asks about bus availability, routes or travel time. The chatbot responds using the system's available transportation data.
14. Minimum Viable Product (MVP)
The following features must be functional in the hackathon prototype.
- [ ] Responsive landing page.
- [ ] Student, Admin and Driver authentication.
- [ ] Role-based dashboards.
- [ ] Source and destination search.
- [ ] Separate public and private transport sections.
- [ ] Bus numbers and seating capacity.
- [ ] Available bus count per route.
- [ ] Estimated travel time.
- [ ] Interactive map with sample locations.
- [ ] Traffic indicators.
- [ ] AI demand prediction.
- [ ] Smart vehicle allocation.
- [ ] Emergency bus breakdown simulation.
- [ ] Alternative transportation recommendations.
- [ ] AI chatbot.
- [ ] Animated vehicle markers.
- [ ] Login date and time records.
15. Future Enhancements
Features that can be developed after the hackathon:
- Live GPS vehicle tracking.
- Government transport API integration.
- Real-time traffic API integration.
- SMS notifications.
- WhatsApp notifications.
- Kannada and other regional language support.
- Offline transportation access.
- Mobile application.
- Digital ticketing.
- Verified local transport provider network.
- Integration with educational institutions.
16. Success Criteria
The project will be considered successful when:
1. All three user roles can authenticate and access their correct dashboards.
2. Students can search and view available transportation.
3. Public and private transportation are displayed separately.
4. The system correctly displays vehicle capacity and available seats.
5. AI can predict transportation demand using sample historical data.
6. The allocation system never exceeds vehicle capacity.
7. Emergency simulation successfully reallocates affected students when capacity permits.
8. The map displays routes and animated vehicle markers.
9. The chatbot provides answers based on application data.
10. The application works on desktop and mobile devices.
11. Expected Impact
ROUTELESS AI aims to make rural student transportation more accessible, organized and efficient.

Expected benefits:
- Reduced transportation difficulties for rural students.
- Better utilization of existing vehicles.
- Reduced overcrowding.
- Faster emergency transportation arrangements.
- Improved visibility of available transportation.
- Better planning for educational institutions.
- Increased access to schools and colleges.
18. Final Project Vision
ROUTELESS AI – THE LAST MILE is more than a traditional bus-tracking platform.

It is an intelligent rural transportation management system that predicts demand, optimizes available resources and finds alternative transportation when regular services fail.

Our Vision:

"Every student deserves a reliable way to reach education, regardless of where they live."

Project Tagline:
ROUTELESS AI – No Student Left Behind, No Journey Without a Solution.

# Details 
🚌 ROUTELESS AI – THE LAST MILE

Smart Transportation. Smarter Routes. No Student Left Behind.

ROUTELESS AI is an AI-powered smart transportation management platform designed to solve transportation challenges faced by students in rural areas. It predicts transportation demand, optimizes routes, manages vehicle allocation, and responds to unexpected emergencies to help students reach their educational institutions safely and on time.

---

🎯 Problem Statement

Rural students often face transportation problems such as:

- Limited availability of government and private buses.
- Overcrowded vehicles and insufficient seats.
- Unexpected vehicle breakdowns.
- Traffic congestion and road blockages.
- Difficulty reaching colleges on examination days.
- Lack of proper coordination between students, drivers, and administrators.

ROUTELESS AI aims to solve these challenges through intelligent transportation planning and emergency management.

💡 Our Solution

ROUTELESS AI combines AI-assisted prediction, smart vehicle allocation, and route optimization to make student transportation more efficient and reliable.

✨ Key Features

1. Student Dashboard

- View available transportation options.
- Check pickup points and destinations.
- View seat availability.
- Check estimated travel time.

2. Admin Dashboard

- Monitor student transportation demand.
- Manage public and private vehicles.
- Track available and occupied seats.
- Monitor routes and transportation statistics.

3. AI Demand Prediction

- Predict future student transportation demand.
- Identify possible vehicle shortages.
- Help administrators plan transportation resources.

4. Smart Route Optimization

- Group students travelling in similar directions.
- Allocate vehicles based on capacity.
- Find suitable routes and alternative paths.
- Reduce unnecessary travel and delays.

5. Public and Private Transportation

- Manage government buses.
- Include private buses and shared vehicles.
- Use available transportation resources efficiently.

6. Interactive Map

- Display transportation routes and vehicles.
- Show traffic conditions.
- Identify alternative routes.
- Visualize transportation updates.

7. AI Chatbot

- Help users with transportation-related queries.
- Provide AI-powered explanations and assistance.

🚨 8. AI Emergency Response Mode

Our special feature handles multiple transportation emergencies simultaneously.

Emergency situations supported:

- Two government buses become unavailable due to breakdowns.
- Student transportation demand increases by 40%.
- A major road becomes inaccessible due to flooding.
- Students with upcoming examinations receive higher priority.

Emergency response:

- Identify affected students.
- Reallocate available vehicles.
- Find alternative routes.
- Prioritize examination students.
- Calculate vehicle capacity and estimated arrival times.
- Display students successfully reassigned and students still at risk.
- Reset the emergency simulation after completion.

🛠️ Technology Stack

Technology| Purpose
React.js| Frontend development
TypeScript| Type-safe development
Tailwind CSS| UI design
Supabase| Backend and authentication
PostgreSQL| Database
Firebase Hosting| Website deployment
Gemini API| AI chatbot and explanations
Leaflet| Interactive maps
OpenStreetMap| Map data
Recharts| Data visualization
Git & GitHub| Version control

⚙️ Project Architecture

- Frontend: React.js, TypeScript and Tailwind CSS.
- Backend: Supabase.
- Database: PostgreSQL.
- AI Services: Gemini API.
- Maps: Leaflet and OpenStreetMap.
- Hosting: Firebase Hosting.

🚀 Getting Started

Prerequisites

- Node.js and npm
- Git
- Supabase account
- Firebase account
- Gemini API key (if using the AI chatbot)

Installation

1. Clone the repository

git clone https://github.com/Hariom693/ROUTELESS-AI.git

2. Open the project folder

cd ROUTELESS-AI

3. Install dependencies

npm install

4. Configure environment variables

Create a ".env" file in the project root and configure the environment variables required by the application.

Use ".env.example" as a reference and provide your own credentials.

Never upload private API keys or secrets to GitHub.

5. Start the development server

npm run dev

Open the local URL displayed in your terminal.

🌍 Real-World Applications

- Rural schools and colleges.
- Government student transportation services.
- Private educational institutions.
- Village-to-city transportation.
- Examination-day transportation management.
- Flood and road-blockage emergency management.

🔮 Future Enhancements

- GPS-based live vehicle tracking.
- Real-time traffic API integration.
- SMS and WhatsApp notifications.
- Online seat booking.
- Parent notifications.
- Advanced machine learning prediction.
- Integration with government transportation services.

🌟 Our Vision

We believe that transportation difficulties should never become a barrier to education.

ROUTELESS AI aims to create a smarter transportation ecosystem where every student gets a better opportunity to reach their educational institution on time.

"No Student Left Behind, No Journey Wasted."

---

Project: ROUTELESS AI – THE LAST MILE
Category: AI / Smart Transportation / EdTech
Repository: https://github.com/Hariom693/ROUTELESS-AI
