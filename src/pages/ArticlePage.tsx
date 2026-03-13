import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle,
  Clock,
  Facebook,
  Link as LinkIcon,
  MessageSquare,
  Send,
  Share2,
  ShieldCheck,
  Twitter,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LiveCounter from '../components/LiveCounter';
import MoodMeter from '../components/MoodMeter';
import { formatTimeAgo } from '../components/NewsCard';
import type { Comment } from '../data/Comment';
import initialComments from '../data/initialComments.json';
import { newsData } from '../data/newsData';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsData.find((a) => a.slug === slug);

  // Load comments from localStorage or use initial comments
  // Since frontend lang sya, sa localStorage natin ini-istore yung comments na ia-add ni user
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedComments = localStorage.getItem(`comments_${slug}`);
    if (savedComments) return JSON.parse(savedComments);

    // Filter initial comments for this specific article
    return (initialComments as Comment[]).filter((c) => c.articleSlug === slug);
  });

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Calculate total comments including replies
  const totalCommentsCount = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.replies?.length || 0);
  }, 0);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (slug) {
      localStorage.setItem(`comments_${slug}`, JSON.stringify(comments));
    }
  }, [comments, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    const shareData = {
      title: article?.title,
      text: article?.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link na-copy na sa clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      articleSlug: slug || '',
      user: 'Bisitang User',
      text: newComment,
      time: 'Ngayon lang',
      likes: 0,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: string, parentId?: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies && parentId === comment.id) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            ),
          };
        }
        // Also check if it's a reply to any comment
        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === commentId
              ? { ...reply, likes: reply.likes + 1 }
              : reply
          );
          if (
            JSON.stringify(updatedReplies) !== JSON.stringify(comment.replies)
          ) {
            return { ...comment, replies: updatedReplies };
          }
        }
        return comment;
      });
    });
  };

  const handlePostReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      articleSlug: slug || '',
      user: 'Bisitang User',
      text: replyText,
      time: 'Ngayon lang',
      likes: 0,
    };

    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      });
    });

    setReplyText('');
    setReplyingTo(null);
  };

  if (!article) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-24 text-center'>
        <h2 className='text-3xl font-serif font-bold mb-4'>
          Artikulo Hindi Nahanap
        </h2>
        <p className='text-slate-600 mb-8'>
          Ang balitang hinahanap mo ay maaaring inilipat o tinanggal na.
        </p>
        <Link
          to='/'
          className='inline-flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold'
        >
          <ArrowLeft size={18} />
          <span>Bumalik sa Home</span>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='bg-white min-h-screen'
    >
      {/* Fact Check Banner */}
      <div className='bg-emerald-50 border-b border-emerald-100 py-3'>
        <div className='max-w-4xl mx-auto px-4 flex items-center justify-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-widest'>
          <ShieldCheck size={16} />
          <span>Fact-Checked ng Independent Media Council (IMC)</span>
        </div>
      </div>

      <article className='max-w-4xl mx-auto px-4 py-12'>
        {/* Header */}
        <header className='mb-10'>
          <div className='flex items-center space-x-4 mb-6'>
            <span className='bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded'>
              {article.category}
            </span>
            <LiveCounter />
          </div>

          <h1 className='text-4xl md:text-6xl font-serif font-black text-slate-900 leading-[1.1] mb-8'>
            {article.title}
          </h1>

          <div className='flex flex-wrap items-center justify-between gap-6 border-y border-slate-100 py-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden'>
                <User size={24} className='text-slate-400' />
              </div>
              <div>
                <div className='flex items-center font-bold text-slate-900'>
                  {article.author}
                  {article.isVerified && (
                    <CheckCircle size={14} className='ml-1 text-blue-500' />
                  )}
                </div>
                <div className='flex items-center text-xs text-slate-500 font-medium'>
                  <Clock size={12} className='mr-1' />
                  Inilathala {formatTimeAgo(article.date)}
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={handleShare}
                className='p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all'
              >
                <Facebook size={20} />
              </button>
              <button
                onClick={handleShare}
                className='p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-all'
              >
                <Twitter size={20} />
              </button>
              <button
                onClick={handleShare}
                className='p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all'
              >
                <LinkIcon size={20} />
              </button>
              <div className='h-6 w-px bg-slate-200 mx-2'></div>
              <button className='p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all'>
                <Bookmark size={20} />
              </button>
              <button
                onClick={handleShare}
                className='p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all'
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className='mb-12 -mx-4 md:mx-0'>
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy='no-referrer'
            loading='lazy'
            className='w-full aspect-video object-cover md:rounded-2xl shadow-2xl'
          />
          <figcaption className='mt-4 text-center text-xs text-slate-400 italic'>
            Source: Editorial Team. All rights reserved.
          </figcaption>
        </figure>

        {/* Content */}
        <div className='prose prose-slate max-w-none mb-16'>
          <p className='text-xl font-medium text-slate-700 leading-relaxed mb-8 italic border-l-4 border-blue-600 pl-6'>
            {article.excerpt}
          </p>

          <div className='space-y-6 text-lg text-slate-800 leading-relaxed font-sans'>
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Interaction Section */}
        <div className='space-y-12 mb-24'>
          <MoodMeter />

          <div className='bg-slate-50 rounded-2xl p-8 border border-slate-100'>
            <div className='flex items-center justify-between mb-8'>
              <h3 className='text-2xl font-serif font-bold flex items-center space-x-2'>
                <MessageSquare size={24} className='text-blue-600' />
                <span>Diskusyon ({totalCommentsCount})</span>
              </h3>
              <button className='text-sm font-bold text-blue-600 hover:underline'>
                Gabay
              </button>
            </div>

            <div className='space-y-8'>
              {/* Comment Input */}
              <form
                onSubmit={handlePostComment}
                className='flex space-x-4 mb-12'
              >
                <div className='w-10 h-10 bg-slate-200 rounded-full shrink-0 flex items-center justify-center'>
                  <User size={20} className='text-slate-400' />
                </div>
                <div className='flex-1'>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Sumali sa usapan...'
                    className='w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] bg-white'
                  ></textarea>
                  <div className='flex justify-end mt-2'>
                    <button
                      type='submit'
                      className='bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center space-x-2'
                    >
                      <span>I-post ang Komento</span>
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className='space-y-6'>
                {comments.map((comment) => (
                  <div key={comment.id} className='space-y-4'>
                    <div className='flex space-x-4'>
                      <div className='w-10 h-10 bg-slate-200 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-500'>
                        {comment.user.charAt(0)}
                      </div>
                      <div className='flex-1'>
                        <div className='bg-white p-4 rounded-xl border border-slate-100 shadow-sm'>
                          <div className='flex items-center justify-between mb-2'>
                            <span className='font-bold text-slate-900'>
                              {comment.user}
                            </span>
                            <span className='text-xs text-slate-400'>
                              {comment.time}
                            </span>
                          </div>
                          <p className='text-slate-700 text-sm leading-relaxed'>
                            {comment.text}
                          </p>
                        </div>
                        <div className='flex items-center space-x-4 mt-2 ml-2'>
                          <button
                            onClick={() => handleLike(comment.id)}
                            className='text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center space-x-1'
                          >
                            <span>Like ({comment.likes})</span>
                          </button>
                          <button
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === comment.id ? null : comment.id
                              )
                            }
                            className='text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors'
                          >
                            Reply
                          </button>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <div className='mt-4 flex space-x-3'>
                            <div className='w-8 h-8 bg-slate-100 rounded-full shrink-0 flex items-center justify-center'>
                              <User size={16} className='text-slate-400' />
                            </div>
                            <div className='flex-1'>
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder='Sumulat ng reply...'
                                className='w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] bg-white text-sm'
                              ></textarea>
                              <div className='flex justify-end mt-2 space-x-2'>
                                <button
                                  onClick={() => setReplyingTo(null)}
                                  className='text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1'
                                >
                                  I-cancel
                                </button>
                                <button
                                  onClick={() => handlePostReply(comment.id)}
                                  className='bg-blue-600 text-white px-4 py-1 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors'
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies List */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className='mt-4 ml-6 space-y-4 border-l-2 border-slate-100 pl-6'>
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className='flex space-x-3'>
                                <div className='w-8 h-8 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-400 text-xs'>
                                  {reply.user.charAt(0)}
                                </div>
                                <div className='flex-1'>
                                  <div className='bg-slate-50 p-3 rounded-lg border border-slate-100'>
                                    <div className='flex items-center justify-between mb-1'>
                                      <span className='font-bold text-slate-900 text-xs'>
                                        {reply.user}
                                      </span>
                                      <span className='text-[10px] text-slate-400'>
                                        {reply.time}
                                      </span>
                                    </div>
                                    <p className='text-slate-700 text-xs leading-relaxed'>
                                      {reply.text}
                                    </p>
                                  </div>
                                  <div className='flex items-center space-x-3 mt-1 ml-1'>
                                    <button
                                      onClick={() =>
                                        handleLike(reply.id, comment.id)
                                      }
                                      className='text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors'
                                    >
                                      Like ({reply.likes})
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related News */}
        <section>
          <h3 className='text-2xl font-serif font-bold mb-8 border-b border-slate-200 pb-2'>
            Higit pa mula sa {article.category}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {newsData
              .filter(
                (a) => a.category === article.category && a.id !== article.id
              )
              .slice(0, 2)
              .map((related) => (
                <div key={related.id} className='group'>
                  <Link to={`/article/${related.slug}`}>
                    <img
                      src={related.image}
                      alt={related.title}
                      loading='lazy'
                      className='w-full aspect-video object-cover rounded-xl mb-4 group-hover:opacity-90 transition-opacity'
                    />
                    <h4 className='font-serif font-bold text-lg leading-tight group-hover:text-blue-700 transition-colors'>
                      {related.title}
                    </h4>
                  </Link>
                </div>
              ))}
          </div>
        </section>
      </article>
    </motion.div>
  );
};

export default ArticlePage;
