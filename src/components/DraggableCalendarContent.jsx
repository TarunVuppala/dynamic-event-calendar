import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { formatDate } from '@/lib/utils'

function isSameDay(d1,d2){
  return d1.getDate()===d2.getDate() && d1.getMonth()===d2.getMonth() && d1.getFullYear()===d2.getFullYear()
}

export default function DraggableCalendarContent({ calendarDays, events, categories, selectedDate, setSelectedDate, setSelectedEventDate, setIsAddEventOpen, onUpdateEvent }) {
  const onDragEnd = (result) => {
    if(!result.destination) return
    const destinationDateStr = result.destination.droppableId
    const eventId = parseInt(result.draggableId,10)
    const eventToMove = events.find(e=>e.id===eventId)
    if(eventToMove) {
      const success = onUpdateEvent(eventId, {...eventToMove, date: destinationDateStr})
      if(!success) {
        return
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(({date,isCurrentMonth})=>{
          const isSelected = isSameDay(date, selectedDate)
          const isToday = isSameDay(date, new Date())
          const isWeekend = date.getDay()===0||date.getDay()===6
          const dayEvents = events.filter(e=>isSameDay(new Date(e.date), date))
          const droppableId = formatDate(date)

          return (
            <Droppable droppableId={droppableId} key={droppableId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 border rounded-lg cursor-pointer min-h-[100px]
                    ${isCurrentMonth?'bg-white':'bg-gray-100 text-gray-400'}
                    ${isSelected?'border-blue-500':''}
                    ${isToday?'font-bold text-blue-600':''}
                    ${isWeekend?'bg-gray-50':''}`}
                  onClick={() => {
                    setSelectedDate(date)
                    setSelectedEventDate(date)
                    setIsAddEventOpen(true)
                  }}
                >
                  <div className="text-right">{date.getDate()}</div>
                  {dayEvents.map((event,eventIndex)=>{
                    const cat = categories.find(c=>c.id===event.categoryId)
                    return (
                      <Draggable key={event.id} draggableId={event.id.toString()} index={eventIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mt-1 p-1 text-xs rounded truncate shadow-sm ${cat?cat.color:''}`}
                          >
                            {event.name}
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
    </DragDropContext>
  )
}
