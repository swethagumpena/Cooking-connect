import { createClient } from '@supabase/supabase-js'

const URL = 'https://ihygldnobbjsvtmcafia.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWdsZG5vYmJqc3Z0bWNhZmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1ODUxNzYsImV4cCI6MTk5NzE2MTE3Nn0.XGhsC4NefDAuB79boiRI7phYGvhihkX16CyJtzXWgy0';

export const supabase = createClient(URL, API_KEY);
