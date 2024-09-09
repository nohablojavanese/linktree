'use client';

import { Scheduler } from "@aldabil/react-scheduler";
import { useState, useEffect } from 'react';
import { createClient } from "@/lib/supabase/client";

interface Todo {
  id: number;
  title: string;
  schedule: string;
  is_hidden: boolean;
}

interface CalendarEvent {
  event_id: number;
  title: string;
  start: Date;
  end: Date;
}

interface CalendarProps {
  refreshTrigger: number;
}

const Calendar = ({ refreshTrigger }: CalendarProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchTodos();
  }, [refreshTrigger]);

  const fetchTodos = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('todos').select('*').order('schedule', { ascending: true });
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      const formattedEvents: CalendarEvent[] = data.map((todo: Todo) => ({
        event_id: todo.id,
        title: todo.title,
        start: new Date(todo.schedule),
        end: new Date(new Date(todo.schedule).getTime() + 60 * 60 * 1000), // Add 1 hour to end time
      }));
      setEvents(formattedEvents);
    }
  };

  return (
    <Scheduler
      view="day"
      events={events}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 0,
        endHour: 23,
        step: 60,
      }}
      day={{
        startHour: 0,
        endHour: 23,
        step: 60,
      }}
      // ... other props
    />
  );
};

export default Calendar;