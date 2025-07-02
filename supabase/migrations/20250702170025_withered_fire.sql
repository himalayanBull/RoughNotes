/*
  # Create content tables for RoughNotes

  1. New Tables
    - `stories`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `banner_image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `poems`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `banner_image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated admin access

  3. Sample Data
    - Insert one sample story
    - Insert one sample poem
*/

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  banner_image text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create poems table
CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  banner_image text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Stories are publicly readable"
  ON stories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Poems are publicly readable"
  ON poems
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Authenticated users can manage stories"
  ON stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage poems"
  ON poems
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample story
INSERT INTO stories (title, slug, excerpt, content, banner_image) VALUES (
  'The Coffee Shop Chronicles',
  'coffee-shop-chronicles',
  'Sometimes the most profound conversations happen between strangers over a cup of coffee. This is the story of Maya, who discovered that listening can be just as powerful as speaking...',
  'Maya had been coming to the same coffee shop for three months, always ordering the same thing: a medium latte with an extra shot and a dash of cinnamon. She chose the corner table by the window, where she could watch the world go by while pretending to work on her laptop.

But today was different. Today, an elderly man sat at her usual table.

She hesitated for a moment, coffee cup in hand, before approaching. "Excuse me," she said softly, "I usually sit here, but—"

"Please," the man interrupted with a warm smile, gesturing to the empty chair across from him. "I could use the company."

His name was Arthur, and he had been coming to this coffee shop for forty years. "My wife and I used to come here every Sunday," he explained, stirring sugar into his black coffee with deliberate care. "She passed last spring, but I still come. Old habits, you know."

Maya found herself sitting down, her laptop forgotten. There was something about Arthur''s gentle demeanor that made her want to listen.

"She used to say that coffee shops are like libraries for the soul," Arthur continued. "People come here not just for caffeine, but for connection. Even if they don''t realize it."

Over the next hour, Arthur shared stories of his forty-year marriage, his career as a high school English teacher, and his recent struggle with loneliness. Maya, who usually kept to herself, found herself opening up about her own challenges—the pressure of her new job, the difficulty of making friends in a new city, the way she sometimes felt invisible in crowds.

"You know," Arthur said as they prepared to leave, "my wife always believed that strangers are just friends we haven''t met yet. Thank you for proving her right."

Maya returned the next Sunday, and the Sunday after that. Sometimes Arthur was there, sometimes he wasn''t. But she began to notice other regulars—the young mother who always looked exhausted, the college student who seemed stressed about exams, the businessman who sat alone reading poetry.

She started small conversations. A compliment about someone''s book choice. An offer to share her table when the shop was crowded. A simple "How''s your day going?" to the barista.

The coffee shop became what Arthur''s wife had described—a library for the soul, where stories were shared over steaming cups and human connection was the daily special.

Months later, when Maya saw a new face looking lost and overwhelmed, she didn''t hesitate to approach. "First time here?" she asked with a warm smile. "The corner table by the window is perfect for people-watching. Mind if I join you?"

And the cycle of connection continued, one conversation at a time.',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
);

-- Insert sample poem
INSERT INTO poems (title, slug, excerpt, content, banner_image) VALUES (
  'Seasons of the Heart',
  'seasons-of-the-heart',
  'Like nature, our hearts go through seasons—times of growth, harvest, dormancy, and renewal. This poem explores the cyclical nature of human emotions and experiences...',
  'Spring arrives in the heart
with tentative green shoots
of hope pushing through
the frozen ground of winter''s grief.

Tender buds of possibility
unfurl in morning light,
each day a little longer,
each breath a little easier.

Summer blazes with passion,
full-throated laughter
echoing through warm evenings,
love ripening like fruit on the vine.

The heart grows bold and generous,
sharing its abundance freely,
believing this golden season
will stretch on forever.

But autumn whispers warnings
in the cooling air,
painting memories in brilliant hues
before they fall away.

The heart learns to let go,
to find beauty in the leaving,
to gather what matters most
before the first frost comes.

Winter settles deep and quiet,
a necessary rest
for the soul that has loved
and lost and loved again.

In the stillness, seeds of wisdom
lie dormant but alive,
waiting for the warmth
that will call them forth once more.

For the heart, like the earth,
knows the secret of seasons—
that every ending
is also a beginning,

that in the depths of winter
spring is already stirring,
and love, like life itself,
finds a way to return.',
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
);