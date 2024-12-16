import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { TimePicker } from './TimePicker'

export default function EventForm({ onAddEvent, initialEvent = {}, categories, setCategories, onCancel }) {
  const [event, setEvent] = useState({
    name: initialEvent.name || '',
    startTime: initialEvent.startTime || '',
    endTime: initialEvent.endTime || '',
    description: initialEvent.description || '',
    categoryId: initialEvent.categoryId || ''
  })

  const [newCategory, setNewCategory] = useState({ name: '', color: '#ffffff' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!event.startTime || !event.endTime) {
      alert("Please select start and end times")
      return
    }
    if (event.startTime >= event.endTime) {
      alert("End time must be after start time")
      return
    }
    onAddEvent(event)
  }

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.color) {
      const cat = { ...newCategory, id: Date.now().toString() }
      setCategories([...categories, cat])
      setNewCategory({ name: '', color: '#ffffff' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          value={event.name}
          onChange={(e) => setEvent({ ...event, name: e.target.value })}
          required
        />
      </div>
      <div className="flex space-x-4 items-center">
        <div className="flex-1">
          <Label>Start Time</Label>
          <TimePicker
            value={event.startTime}
            onChange={(time) => setEvent({ ...event, startTime: time })}
          />
        </div>
        <div className="flex-1">
          <Label>End Time</Label>
          <TimePicker
            value={event.endTime}
            onChange={(time) => setEvent({ ...event, endTime: time })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select
          value={event.categoryId}
          onValueChange={(value) => setEvent({ ...event, categoryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="border-t pt-4">
        <Label>Add New Category</Label>
        <div className="flex space-x-2 mt-2">
          <Input
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <Input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
          />
          <Button type="button" onClick={handleAddCategory}>Add</Button>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button type="submit">{initialEvent.id ? 'Update Event' : 'Add Event'}</Button>
        {onCancel && <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}
