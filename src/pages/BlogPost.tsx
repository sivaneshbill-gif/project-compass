import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  created_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, content, cover_image_url, author_name, created_at')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } else if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout showHeader={false}>
        <div className="p-4">
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-48 w-full rounded-lg mb-4" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout showHeader={false}>
        <div className="p-4 text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showHeader={false}>
      <article className="p-4">
        <Link to="/blog">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {post?.cover_image_url && (
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-2xl font-bold text-foreground mb-3">{post?.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post?.author_name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post && formatDate(post.created_at)}
          </span>
        </div>

        <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-a:text-primary prose-blockquote:text-muted-foreground prose-blockquote:border-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post?.content || ''}
          </ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;
