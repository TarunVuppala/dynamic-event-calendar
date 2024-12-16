# Dynamic Event Calendar

This is a dynamic event calendar application built with React, Vite, Tailwind CSS, and shadcn UI components. It demonstrates advanced React logic, a clean UI, and multiple features including event creation, editing, deletion, drag-and-drop between calendar dates, and data persistence with localStorage.

## Features

### Calendar View
- Displays a monthly calendar grid.
- Highlights the current day and the selected day.
- Allows navigation between months via "Previous" and "Next" buttons.
- Weekends and weekdays are visually distinguished.

### Event Management
- Click on a day in the calendar to open a modal and add new events.
- Each event includes:
  - Event Name
  - Start Time and End Time (selected from dropdowns)
  - Optional Description
  - Category (color-coded)
- Edit events by clicking "Edit" in the event list, which opens a modal.
- Delete events easily with a "Delete" button.

### Drag-and-Drop
- Drag events from one day to another in the calendar to reschedule them.
- Drag events from the left panel list onto calendar days to update their date.
- The application prevents overlapping events. If a conflict is detected, it alerts the user and reverts the action.

### Event List (Left Panel)
- Shows all events in a single chronological list (sorted by date and time).
- Includes a search bar to filter events by name.
- Supports drag-and-drop operations within the list and onto the calendar.
- Updating an event's date in the calendar immediately reflects in the list, as events are always sorted by date/time.

### Data Persistence
- Events are stored in `localStorage`, ensuring that events persist after page refreshes.

### Exporting Events
- Export events of the currently displayed month as JSON or CSV via the top navigation bar.

### No External Date Libraries
- Calendar logic is implemented from scratch using native JavaScript Date methods.

## Tech Stack
- **Frontend:** React, JSX
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn (based on Radix UI)
- **Drag-and-Drop:** react-beautiful-dnd
- **Data Persistence:** localStorage

## Installation and Setup

```bash
# Clone the Repository
git clone <your-repo-url>
cd dynamic-event-calendar

# Install Dependencies
npm install

# Run the Development Server
npm run dev
# App will be running at http://localhost:5173

# Build for Production
npm run build
# Creates an optimized production build in the dist directory

Deployment

You can deploy the production-ready `dist` folder to any static hosting provider such as Vercel, Netlify, or GitHub Pages.

For example, to deploy to Vercel:

1. Run `npm run build`.
2. Install the Vercel CLI: `npm install -g vercel`.
3. Run `vercel` and follow the prompts to deploy.

Usage

- **View Events:**  
  The left panel shows all events in chronological order. The main panel shows the calendar.

- **Adding Events:**  
  Click a date on the calendar. A modal opens. Fill in the event details and submit.

- **Editing Events:**  
  Find the event in the left panel event list. Click "Edit" to open a modal with the event details. Update and save.

- **Deleting Events:**  
  Click the "Delete" button in the event list for the chosen event.

- **Rescheduling Events (Drag-and-Drop):**  
  - Drag an event from one day on the calendar to another day to move it.
  - Drag an event from the left panel and drop it onto a date in the calendar to update its date.
  - If any conflict arises, an alert is displayed and the move is reverted.

- **Searching Events:**  
  Use the search bar at the top of the left panel to filter events by name.

- **Exporting Events:**  
  Use the buttons in the top navigation bar to export the current month’s events as JSON or CSV.

Code Structure

- `App.jsx`: The root component that sets up state and passes props down.
- `hooks/useEvents.js`: Custom hook for managing events and localStorage.
- `components/`:
  - `Navbar.jsx`: Top navigation with month switching and export buttons.
  - `Calendar.jsx`: Main calendar view handling date generation and event modal.
  - `EventList.jsx`: Left panel listing all events with searching, editing, deleting, and drag-and-drop.
  - `EventForm.jsx`: Modal form for adding and editing events (no direct date input; date is inferred from context).
  - `TimePicker.jsx`: Simple dropdown-based time picker component.
  - `DraggableCalendarContent.jsx`: Calendar grid with drag-and-drop support.
  - `ExportEvents.jsx`: Buttons for exporting events to JSON or CSV.

Notes

- If any conflicts occur while adding or updating events (e.g., overlapping times), an alert is shown and the change is not saved.
- If an event is dragged onto a date that causes a conflict, the change is reverted and an alert is shown.
