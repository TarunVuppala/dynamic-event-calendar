import { Button } from "@/components/ui/button"

export default function ExportEvents({ events, currentDate }) {
  const exportToJSON = () => {
    const filtered = events.filter(e => {
      const d = new Date(e.date)
      return d.getFullYear() === currentDate.getFullYear() && d.getMonth() === currentDate.getMonth()
    })
    const dataStr = JSON.stringify(filtered)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const fileName = `events_${currentDate.getFullYear()}_${currentDate.getMonth()+1}.json`
    downloadFile(dataUri, fileName)
  }

  const exportToCSV = () => {
    const filtered = events.filter(e => {
      const d = new Date(e.date)
      return d.getFullYear() === currentDate.getFullYear() && d.getMonth() === currentDate.getMonth()
    })
    const header = "Date,Name,Start Time,End Time,Description\n"
    const rows = filtered.map(e => `${e.date},${e.name},${e.startTime},${e.endTime},${e.description||''}`).join('\n')
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(header+rows)
    const fileName = `events_${currentDate.getFullYear()}_${currentDate.getMonth()+1}.csv`
    downloadFile(csvContent, fileName)
  }

  function downloadFile(uri, filename) {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    link.click()
  }

  return (
    <div>
      <Button onClick={exportToJSON} className="mr-2">Export JSON</Button>
      <Button onClick={exportToCSV}>Export CSV</Button>
    </div>
  )
}
