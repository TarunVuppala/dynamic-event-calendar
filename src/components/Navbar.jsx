import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

import ExportEvents from './ExportEvents'

export default function Navbar({ currentDate, onPrevMonth, onNextMonth, events }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="text-2xl font-bold">Event Calendar</div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <ExportEvents events={events} currentDate={currentDate} />
    </nav>
  )
}
