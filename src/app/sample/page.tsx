'use client';

import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { DatePicker, DateValue } from "@nextui-org/react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/shadcn/ui/toaster";
import TodoList from './components';
import { addTodo } from './actions';

export default function Home() {
    const [title, setTitle] = useState('');
    const [schedule, setSchedule] = useState<DateValue | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { toast } = useToast();

    const handleAddTodo = async () => {
        if (!title.trim()) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Title cannot be empty",
            });
            return;
        }
        if (!schedule) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Schedule cannot be empty",
            });
            return;
        }
        // Convert DateValue to ISO string
        const scheduleDate = new Date(schedule.toString());
        const result = await addTodo(title, scheduleDate.toISOString());
        if (result.success) {
            setTitle('');
            setSchedule(null);
            setRefreshTrigger(prev => prev + 1);
            toast({
                title: "Success",
                description: result.message,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.message,
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50 text-black">
            <div className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4 text-blue-600">Add from Schedule</h1>
                <div className="mb-4 space-y-2">
                    <Input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Todo Title" 
                        className="text-black"
                    />
                    <DatePicker 
                        defaultValue={schedule}
                        onChange={(date: DateValue | null) => setSchedule(date)}
                        classNames={{
                            input: "text-black hover:bg-gray-100",
                            inputWrapper: "border-blue-500 rounded-md",
                            popoverContent: "bg-white shadow-lg rounded-lg",
                            calendar: "bg-white p-2",
                            calendarContent: "text-black font-medium",
                            timeInputLabel: "text-blue-600 font-bold",
                            timeInput: "border-blue-300 text-black rounded-md px-2 py-1",
                        }}
                    />
                    <Button onClick={handleAddTodo} color="primary" className='bg-blue-600 text-white'>Create Schedule</Button>
                </div>
                <TodoList refreshTrigger={refreshTrigger} />
            </div>
            <Toaster />
        </div>
    );
}