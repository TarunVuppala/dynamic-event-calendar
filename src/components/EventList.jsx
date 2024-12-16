import { useState, useMemo } from 'react'

import { Input } from "@/components/ui/input"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import EventForm from './EventForm'

export default function EventList({ events, onUpdateEvent, onDeleteEvent, searchTerm, setSearchTerm, categories, setCategories }) {
  const [editingEvent, setEditingEvent] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const sortedEvents = useMemo(() => {
    return [...events].sort((a,b) => {
      const diff = new Date(a.date)-new Date(b.date)
      if (diff!==0) return diff
      return a.startTime.localeCompare(b.startTime)
    })
  }, [events])

  const onDragEnd = (result) => {
    if (!result.destination) return
    const destinationId = result.destination.droppableId
    const eventId = parseInt(result.draggableId,10)
    const draggedEvent = events.find(e=>e.id===eventId)
    if(!draggedEvent) return
    if (destinationId !== 'eventList') {
      const success = onUpdateEvent(eventId, {...draggedEvent, date: destinationId})
      if(!success) {
        return
      }
    }
  }

  function handleEditEvent(updatedEvent) {
    const success = onUpdateEvent(editingEvent.id, updatedEvent)
    if(success) setIsEditModalOpen(false)
  }

  return (
    <div className="w-full md:w-1/3 p-4 bg-white border-r overflow-y-auto">
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="eventList" type="EVENT">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {sortedEvents.map((ev,index)=>{
                const cat = categories.find(c=>c.id===ev.categoryId)
                return (
                  <Draggable key={ev.id} draggableId={ev.id.toString()} index={index}>
                    {(provided)=>(
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 border rounded-lg shadow-sm ${cat?cat.color:''}`}
                      >
                        <h3 className="font-semibold">{ev.name}</h3>
                        <p className="text-sm text-gray-600">{new Date(ev.date).toLocaleDateString()} {ev.startTime}-{ev.endTime}</p>
                        {ev.description && <p className="mt-2 text-sm">{ev.description}</p>}
                        <div className="mt-2 space-x-2">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => {
                              setEditingEvent(ev)
                              setIsEditModalOpen(true)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => onDeleteEvent(ev.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isEditModalOpen && editingEvent && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Event</DialogTitle>
            </DialogHeader>
            <EventForm
              onAddEvent={handleEditEvent}
              initialEvent={editingEvent}
              categories={categories}
              setCategories={setCategories}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
