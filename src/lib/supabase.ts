import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Supabase error:', error.message);
    return [];
  }
  return (data as BlogPost[]) || [];
}

/*
 * Supabase SQL to create the blog_posts table:
 *
 * CREATE TABLE blog_posts (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   type TEXT NOT NULL,
 *   badge TEXT,
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   author TEXT,
 *   category TEXT,
 *   category_color TEXT,
 *   media_url TEXT,
 *   display_order INTEGER NOT NULL DEFAULT 0,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 *
 * ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Public read" ON blog_posts
 *   FOR SELECT TO anon, authenticated USING (true);
 */
