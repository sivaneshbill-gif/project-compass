-- Allow full access for insert/update/delete via service role (for admin)
-- Since we don't have user auth yet, we'll allow public insert/update/delete 
-- but restrict it to a simple admin key approach via edge function later

-- For now, allow public to manage posts (you can secure this later with auth)
CREATE POLICY "Allow public to insert posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public to update posts" 
ON public.blog_posts 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public to delete posts" 
ON public.blog_posts 
FOR DELETE 
USING (true);

-- Also allow reading drafts for admin
CREATE POLICY "Allow reading all posts for admin" 
ON public.blog_posts 
FOR SELECT 
USING (true);