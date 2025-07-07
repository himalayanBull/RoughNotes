/*
  # Add RoughNotes inspiration story

  1. New Content
    - Insert "How RoughNotes Were Born" story
    
  2. Notes
    - This story explains the inspiration behind the blog
    - Uses the same banner image as coffee shop story for consistency
*/

-- Insert the RoughNotes inspiration story
INSERT INTO stories (title, slug, excerpt, content, banner_image) VALUES (
  'How RoughNotes Were Born',
  'roughnotes inspiration',
  'RoughNotes are Love letters to life, music, and the universe.',
  'I don''t think I''ve ever met anyone more romantic than myself.
Maybe there are many — maybe I''m just blind to see them.
Or maybe I''m too ignorant, or even too arrogant, to accept that there could be others more romantic than me.

But my romance isn''t just about love for a person.
It''s about love for nature, for the stars, for the silence, for everything this universe has to offer.
One of those beautiful offerings is writing — and words.

I''m someone deeply in love with music and poetry.
I can spend days and nights lost in their rhythm and emotion.
But as much as I love reading and listening, I also love writing.
Writing about what I feel, what I see, what I''ve experienced — and sometimes even what others have gone through and shared with me.

The only challenge I often face is:
Who do I share all this with?
So, I write. And then I throw the paper away.

But today, out of a strange loneliness, I felt the urge to share again.
I looked around and realized — I have no one.
Then, almost in the same breath, I realized — I have everyone.

So, I thought, why not share it with everyone?

That''s why I created this blog.
A place to pour my thoughts, feelings, and words.
A place where maybe someone, somewhere, will feel the same.',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
) ON CONFLICT (slug) DO NOTHING;