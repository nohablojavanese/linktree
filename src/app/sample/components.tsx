'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, Button, Input } from '@nextui-org/react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/shadcn/ui/toaster";

interface Todo {
  id: number;
  title: string;
  schedule: string;
  is_hidden: boolean;
}

interface TodoListProps {
  refreshTrigger: number;
}

const TodoList = ({ refreshTrigger }: TodoListProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editSchedule, setEditSchedule] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTrigger]); // Add refreshTrigger to the dependency array

    const fetchTodos = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.from('todos').select('*').order('schedule', { ascending: true });
        if (error) {
            console.error('Error fetching todos:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch todos",
            });
        } else {
            setTodos(data || []);
        }
    };

    const deleteTodo = async (id: number) => {
        const supabase = createClient();
        const { error } = await supabase.from('todos').delete().match({ id });
        if (error) {
            console.error('Error deleting todo:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete todo",
            });
        } else {
            fetchTodos();
            toast({
                title: "Success",
                description: "Todo deleted successfully",
            });
        }
    };

    const updateTodo = async (id: number, updates: Partial<Todo>) => {
        const supabase = createClient();
        const { error } = await supabase.from('todos').update(updates).match({ id });
        if (error) {
            console.error('Error updating todo:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update todo",
            });
        } else {
            fetchTodos();
            setEditingId(null);
            toast({
                title: "Success",
                description: "Todo updated successfully",
            });
        }
    };

    const toggleHide = async (id: number, currentState: boolean) => {
        await updateTodo(id, { is_hidden: !currentState });
    };

    return (
        <div className="text-black">
            <Toaster />
            {todos.filter(todo => !todo.is_hidden).map(todo => (
                <Card key={todo.id} className="mb-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100">
                    {editingId === todo.id ? (
                        <>
                            <Input 
                                value={editTitle} 
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="mb-2 text-black"
                            />
                            <Input 
                                type="datetime-local"
                                value={editSchedule}
                                onChange={(e) => setEditSchedule(e.target.value)}
                                className="mb-2 text-black"
                            />
                            <Button color="primary" onClick={() => updateTodo(todo.id, { title: editTitle, schedule: editSchedule })}>Save</Button>
                        </>
                    ) : (
                        <>
                            <h4 className="text-lg font-bold text-blue-600">{todo.title}</h4>
                            <p className="text-purple-600">{new Date(todo.schedule).toLocaleString()}</p>
                            <div className="mt-2 space-x-2">
                                <Button size="sm" color="primary" onClick={() => {
                                    setEditingId(todo.id);
                                    setEditTitle(todo.title);
                                    setEditSchedule(todo.schedule);
                                }}>Edit</Button>
                                <Button size="sm" color="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                                <Button size="sm" color="secondary" onClick={() => toggleHide(todo.id, todo.is_hidden)}>Hide</Button>
                            </div>
                        </>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default TodoList;