import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "https://your-project-id.supabase.co" &&
  supabaseAnonKey !== "your-anon-key-here";

let supabase: any = null;

if (hasValidCredentials) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

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

// Mock data for development
const mockStories: Story[] = [
  {
    id: '1',
    title: 'Coffee Shop Chronicles',
    slug: 'coffee-shop-chronicles',
    excerpt: 'A heartwarming tale of connections made over morning coffee.',
    content: 'The aroma of freshly ground coffee beans filled the air as Sarah pushed open the door to her favorite café...',
    banner_image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'The Last Letter',
    slug: 'the-last-letter',
    excerpt: 'A story about love, loss, and the power of written words.',
    content: 'Margaret found the letter tucked between the pages of her grandmother\'s favorite book...',
    banner_image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z'
  }
];

const mockPoems: Poem[] = [
  {
    id: '1',
    title: 'Seasons of the Heart',
    slug: 'seasons-of-the-heart',
    excerpt: 'A reflection on love through the changing seasons.',
    content: 'Spring whispers promises\nSummer burns with passion\nAutumn teaches letting go\nWinter holds the wisdom...',
    banner_image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    created_at: '2024-01-12T09:15:00Z',
    updated_at: '2024-01-12T09:15:00Z'
  },
  {
    id: '2',
    title: 'City Lights',
    slug: 'city-lights',
    excerpt: 'An urban poem about finding beauty in the concrete jungle.',
    content: 'Neon dreams and midnight schemes\nPaint the canvas of the night\nEvery window tells a story\nEvery street light burns so bright...',
    banner_image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
    created_at: '2024-01-08T20:45:00Z',
    updated_at: '2024-01-08T20:45:00Z'
  }
];

// Fetch all stories
export async function getStories(): Promise<Story[]> {
  if (!hasValidCredentials) {
    console.warn('Using mock data - please configure Supabase credentials');
    return mockStories;
  }

  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching stories:', error);
    console.warn('Falling back to mock data');
    return mockStories;
  }

  return data || [];
}

// Fetch all poems
export async function getPoems(): Promise<Poem[]> {
  if (!hasValidCredentials) {
    console.warn('Using mock data - please configure Supabase credentials');
    return mockPoems;
  }

  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching poems:', error);
    console.warn('Falling back to mock data');
    return mockPoems;
  }

  return data || [];
}

// Fetch a single story by slug
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  if (!hasValidCredentials) {
    console.warn('Using mock data - please configure Supabase credentials');
    return mockStories.find(story => story.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching story:', error);
    console.warn('Falling back to mock data');
    return mockStories.find(story => story.slug === slug) || null;
  }

  return data;
}

// Fetch a single poem by slug
export async function getPoemBySlug(slug: string): Promise<Poem | null> {
  if (!hasValidCredentials) {
    console.warn('Using mock data - please configure Supabase credentials');
    return mockPoems.find(poem => poem.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching poem:', error);
    console.warn('Falling back to mock data');
    return mockPoems.find(poem => poem.slug === slug) || null;
  }

  return data;
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