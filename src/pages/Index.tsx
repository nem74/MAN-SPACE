import { useState, useEffect } from 'react';
import { MessageSquare, Send, Clock, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Reply {
  id: string;
  message: string;
  timestamp: Date;
  likes: number;
}

interface Post {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  replies: Reply[];
  likes: number;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostMessage, setNewPostMessage] = useState('');
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Struggling with work-life balance',
        message: 'I feel like I\'m constantly torn between being present for my family and meeting work demands. The pressure is overwhelming and I don\'t know how to find the right balance.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 12,
        replies: [
          {
            id: '1-1',
            message: 'I\'ve been there. What helped me was setting clear boundaries - no work emails after 7pm. It took time but my family appreciated it.',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            likes: 8
          },
          {
            id: '1-2',
            message: 'Consider talking to your manager about flexible hours. Many companies are more understanding than we think.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            likes: 5
          }
        ]
      },
      {
        id: '2',
        title: 'Dealing with loneliness after divorce',
        message: 'The house feels so empty now. I\'m not sure how to rebuild my social life or even where to start. Some days are harder than others.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        likes: 18,
        replies: [
          {
            id: '2-1',
            message: 'Divorce is one of life\'s biggest changes. Be patient with yourself. Consider joining local groups or activities you enjoy - even small steps count.',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            likes: 12
          }
        ]
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostMessage.trim()) {
      toast({
        title: "Please fill in both title and message",
        variant: "destructive"
      });
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      message: newPostMessage,
      timestamp: new Date(),
      replies: [],
      likes: 0
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostTitle('');
    setNewPostMessage('');
    setShowNewPostForm(false);
    
    toast({
      title: "Your post has been shared anonymously",
      description: "Thank you for trusting this community with your thoughts."
    });
  };

  const handleSubmitReply = (postId: string) => {
    const replyMessage = replyInputs[postId];
    if (!replyMessage?.trim()) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      message: replyMessage,
      timestamp: new Date(),
      likes: 0
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));

    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
    
    toast({
      title: "Reply sent",
      description: "Your supportive message has been added."
    });
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post, 
            replies: post.replies.map(reply => 
              reply.id === replyId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : post
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">ManSpace</h1>
              <p className="text-slate-600">A judgment-free space for men to share and support each other</p>
            </div>
            <Button 
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="bg-slate-700 hover:bg-slate-800 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Share Your Thoughts
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* New Post Form */}
        {showNewPostForm && (
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-800">Share Anonymously</h3>
              <p className="text-sm text-slate-600">Your post will be completely anonymous. Share what's on your mind.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Give your post a title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="border-slate-300 focus:border-slate-500"
              />
              <Textarea
                placeholder="Share your thoughts, struggles, or what's on your mind. This is a safe space..."
                value={newPostMessage}
                onChange={(e) => setNewPostMessage(e.target.value)}
                rows={4}
                className="border-slate-300 focus:border-slate-500"
              />
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewPostForm(false)}
                  className="border-slate-300"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitPost}
                  className="bg-slate-700 hover:bg-slate-800 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post Anonymously
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <Card key={post.id} className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{post.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{post.message}</p>
                    </div>
                  </div>

                  {/* Post Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTimeAgo(post.timestamp)}
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                        {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePost(post.id)}
                        className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        className="text-slate-600 hover:text-slate-800"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>

                  {/* Replies Section */}
                  {expandedPost === post.id && (
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      {/* Existing Replies */}
                      {post.replies.map(reply => (
                        <div key={reply.id} className="bg-slate-50 rounded-lg p-4 ml-4">
                          <p className="text-slate-700 mb-2">{reply.message}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-slate-500">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(reply.timestamp)}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikeReply(post.id, reply.id)}
                              className="text-slate-500 hover:text-red-600 hover:bg-red-50 h-6 px-2"
                            >
                              <ArrowUp className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Reply Input */}
                      <div className="flex gap-2 ml-4">
                        <Textarea
                          placeholder="Share some support or advice..."
                          value={replyInputs[post.id] || ''}
                          onChange={(e) => setReplyInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          rows={3}
                          className="flex-1 border-slate-300 focus:border-slate-500"
                        />
                        <Button
                          onClick={() => handleSubmitReply(post.id)}
                          disabled={!replyInputs[post.id]?.trim()}
                          className="bg-slate-700 hover:bg-slate-800 text-white self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No posts yet</h3>
              <p className="text-slate-600 mb-4">Be the first to share your thoughts with the community.</p>
              <Button 
                onClick={() => setShowNewPostForm(true)}
                className="bg-slate-700 hover:bg-slate-800 text-white"
              >
                Share Your Thoughts
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-600 mb-2">
            <strong>ManSpace</strong> - A safe, anonymous space for men to share and support each other
          </p>
          <p className="text-sm text-slate-500">
            Remember: You're not alone. Every struggle shared is a step toward healing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
