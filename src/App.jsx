import { useState } from 'react'
import Navbar from './components/Navbar'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import { useEvents } from './hooks/useEvents'

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([
    { id: '1', name: 'Work', color: 'bg-blue-200' },
    { id: '2', name: 'Personal', color: 'bg-green-200' },
    { id: '3', name: 'Important', color: 'bg-red-200' },
    { id: '4', name: 'Other', color: 'bg-gray-200' },
  ])

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-screen">
      <Navbar 
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
        onNextMonth={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
        events={events}
      />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <EventList
          events={filteredEvents}
          selectedDate={selectedDate}
          onAddEvent={addEvent}
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          setCategories={setCategories}
        />
        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
          onAddEvent={addEvent}
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </div>
  )
}
