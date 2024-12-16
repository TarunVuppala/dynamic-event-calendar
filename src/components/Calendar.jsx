import { useState, useEffect } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatDate } from '@/lib/utils'

import EventForm from './EventForm'
import DraggableCalendarContent from './DraggableCalendarContent'

export default function Calendar({ currentDate, selectedDate, setSelectedDate, events, onAddEvent, onUpdateEvent, categories, setCategories }) {
  const [calendarDays, setCalendarDays] = useState([])
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [selectedEventDate, setSelectedEventDate] = useState(null)

  useEffect(() => {
    setCalendarDays(getCalendarDays(currentDate))
  }, [currentDate])

  function getCalendarDays(date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month+1, 0)
    const days = []

    for(let i=0;i<firstDay.getDay();i++){
      const d = new Date(firstDay)
      d.setDate(d.getDate()-(firstDay.getDay()-i))
      days.push({date:d, isCurrentMonth:false})
    }

    for(let i=1; i<=lastDay.getDate(); i++){
      days.push({date:new Date(year, month, i), isCurrentMonth:true})
    }

    const remaining = 7-(days.length%7)
    if(remaining<7 && remaining>0){
      const last = days[days.length-1].date
      for(let i=1;i<=remaining;i++){
        const d = new Date(last)
        d.setDate(d.getDate()+i)
        days.push({date:d,isCurrentMonth:false})
      }
    }

    return days
  }

  function handleAddEvent(eventData){
    const dateStr = formatDate(selectedEventDate)
    const newEvent = {...eventData, date: dateStr}
    const success = onAddEvent(newEvent)
    if(success) setIsAddEventOpen(false)
  }

  return (
    <div className="flex-1 p-4 bg-gray-100 overflow-auto">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=>
          <div key={d} className={`text-center font-semibold p-2 ${i===0||i===6?'text-red-500':''}`}>{d}</div>
        )}
      </div>
      <DraggableCalendarContent
        calendarDays={calendarDays}
        events={events}
        categories={categories}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedEventDate={setSelectedEventDate}
        setIsAddEventOpen={setIsAddEventOpen}
        onUpdateEvent={onUpdateEvent}
      />
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <EventForm 
            onAddEvent={handleAddEvent}
            categories={categories}
            setCategories={setCategories}
            onCancel={() => setIsAddEventOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
