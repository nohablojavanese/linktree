"use server";

import { createClient } from "@/lib/supabase/server";

export const addTodo = async (title: string, schedule: string) => {
    const supabase = createClient();
    
    // Validate and set a default schedule if empty
    const validSchedule = schedule.trim() !== '' ? schedule : new Date().toISOString();

    const { data, error } = await supabase
        .from('todos')
        .insert([{ title, schedule: validSchedule, is_hidden: false }]);
    if (error) {
        console.error('Error adding todo:', error);
        return { success: false, message: "Failed to add todo" };
    }
    return { success: true, message: "Todo added successfully" };
};
