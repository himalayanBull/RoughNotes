import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };

export type Story = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  banner_image: string;
  created_at: string;
  updated_at: string;
};

export type Poem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  banner_image: string;
  created_at: string;
  updated_at: string;
};

// Fetch all stories
export async function getStories(): Promise<Story[]> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Network error fetching stories:', error);
    return [];
  }
}

// Fetch all poems
export async function getPoems(): Promise<Poem[]> {
  try {
    const { data, error } = await supabase
      .from('poems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching poems:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Network error fetching poems:', error);
    return [];
  }
}

// Fetch a single story by slug
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching story:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Network error fetching story:', error);
    return null;
  }
}

// Fetch a single poem by slug
export async function getPoemBySlug(slug: string): Promise<Poem | null> {
  try {
    const { data, error } = await supabase
      .from('poems')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching poem:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Network error fetching poem:', error);
    return null;
  }
}

// Get featured content (latest stories and poems combined)
export async function getFeaturedContent() {
  const [stories, poems] = await Promise.all([getStories(), getPoems()]);
  
  const combined = [
    ...stories.map(story => ({ ...story, type: 'story' as const })),
    ...poems.map(poem => ({ ...poem, type: 'poem' as const }))
  ];

  // Sort by creation date and return the latest 4
  return combined
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);
}