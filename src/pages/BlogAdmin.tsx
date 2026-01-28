import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [authorName, setAuthorName] = useState('Tellus Team');
  const [published, setPublished] = useState(false);

  // Fetch all posts for the list view
  useEffect(() => {
    if (!id) {
      fetchAllPosts();
    }
  }, [id]);

  // Fetch single post for editing
  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost(id);
    }
  }, [id]);

  const fetchAllPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive',
      });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const fetchPost = async (postId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .maybeSingle();

    if (error || !data) {
      toast({
        title: 'Error',
        description: 'Post not found',
        variant: 'destructive',
      });
      navigate('/blog-admin');
    } else {
      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setExcerpt(data.excerpt || '');
      setCoverImageUrl(data.cover_image_url || '');
      setAuthorName(data.author_name);
      setPublished(data.published);
    }
    setLoading(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      toast({
        title: 'Validation Error',
        description: 'Title, slug, and content are required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    const postData = {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      cover_image_url: coverImageUrl || null,
      author_name: authorName,
      published,
    };

    let error;

    if (isEditing && id !== 'new') {
      const result = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id);
      error = result.error;
    } else {
      const result = await supabase
        .from('blog_posts')
        .insert([postData]);
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Post ${isEditing ? 'updated' : 'created'} successfully`,
      });
      navigate('/blog-admin');
    }
  };

  const handleDelete = async () => {
    if (!id || id === 'new') return;
    
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    setDeleting(false);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Post deleted successfully',
      });
      navigate('/blog-admin');
    }
  };

  // List view
  if (!id) {
    return (
      <Layout showHeader={false}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Blog Admin</h1>
            <Link to="/blog-admin/new">
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No posts yet</p>
              <Link to="/blog-admin/new">
                <Button>Create your first post</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">
                          {post.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.published ? '✅ Published' : '📝 Draft'} • {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link to={`/blog-admin/${post.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        {post.published && (
                          <Link to={`/blog/${post.slug}`}>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Editor view
  return (
    <Layout showHeader={false}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/blog-admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex gap-2">
            {isEditing && id !== 'new' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="edit" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-url-slug"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL: /blog/{slug || 'your-slug'}
              </p>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt (optional)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description for the blog listing"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
              <Input
                id="coverImage"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Author name"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
              <Label htmlFor="published">
                {published ? 'Published (visible to everyone)' : 'Draft (only visible here)'}
              </Label>
            </div>

            <div>
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post in Markdown...

# Heading 1
## Heading 2

Regular paragraph text.

- Bullet point
- Another point

**Bold text** and *italic text*

![Image alt](https://example.com/image.jpg)"
                rows={15}
                className="font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                {coverImageUrl && (
                  <div className="aspect-video overflow-hidden rounded-lg mb-6">
                    <img
                      src={coverImageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h1 className="text-2xl font-bold mb-4">{title || 'Untitled Post'}</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  By {authorName} • {new Date().toLocaleDateString()}
                </p>
                <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-a:text-primary prose-blockquote:text-muted-foreground prose-blockquote:border-primary">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || '*No content yet*'}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BlogAdmin;
