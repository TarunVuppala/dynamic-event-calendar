import { useState, useEffect } from 'react'

export function useEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('events')
    if (stored) setEvents(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  function isOverlapping(newEvent, excludeId = null) {
    const newStart = new Date(`${newEvent.date}T${newEvent.startTime}`).getTime()
    const newEnd = new Date(`${newEvent.date}T${newEvent.endTime}`).getTime()
    return events.some(ev => {
      if (excludeId && ev.id === excludeId) return false
      if (new Date(ev.date).toDateString() !== new Date(newEvent.date).toDateString()) return false
      const evStart = new Date(`${ev.date}T${ev.startTime}`).getTime()
      const evEnd = new Date(`${ev.date}T${ev.endTime}`).getTime()
      return (newStart < evEnd && newEnd > evStart)
    })
  }

  function addEvent(newEvent) {
    if (isOverlapping(newEvent)) {
      alert('This time slot conflicts with an existing event.')
      return false
    }
    setEvents([...events, { ...newEvent, id: Date.now() }])
    return true
  }

  function updateEvent(id, updatedEvent) {
    if (isOverlapping(updatedEvent, id)) {
      alert('This time slot conflicts with an existing event.')
      return false
    }
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedEvent } : e))
    return true
  }

  function deleteEvent(id) {
    setEvents(events.filter(e => e.id !== id))
  }

  return { events, addEvent, updateEvent, deleteEvent }
}
