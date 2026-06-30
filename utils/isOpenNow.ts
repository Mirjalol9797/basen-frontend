import type { ScheduleDay } from '~/types/pool'

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

function minutesSinceMidnight(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export const isOpenNow = (schedule: ScheduleDay[] | null): boolean => {
  if (!schedule) return false
  const now = new Date()
  const today = DAYS[now.getDay()]
  const entry = schedule.find(s => s.day === today)
  if (!entry || entry.closed) return false
  const current = now.getHours() * 60 + now.getMinutes()
  return current >= minutesSinceMidnight(entry.open) && current <= minutesSinceMidnight(entry.close)
}

export const getTodayEntry = (schedule: ScheduleDay[] | null): ScheduleDay | undefined => {
  if (!schedule) return undefined
  const today = DAYS[new Date().getDay()]
  return schedule.find(s => s.day === today)
}
