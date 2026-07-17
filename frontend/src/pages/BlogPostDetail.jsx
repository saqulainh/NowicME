import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Eye, Clock, ChevronLeft, BookOpen, Share2, Check, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import SEO from '../components/SEO';

// Simple Markdown parser
function parseMarkdown(md = '') {
    let html = md
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
        
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-white mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black text-white mt-10 mb-6">$1</h1>');
    
    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gm, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-[#34d99a] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Code Blocks
    html = html.replace(/```([\s\S]*?)```/gm, '<pre class="bg-black/50 border border-white/5 rounded-2xl p-5 my-6 font-mono text-xs text-mint overflow-x-auto leading-relaxed">$1</pre>');
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs text-mint">$1</code>');
    
    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#34d99a] bg-white/[0.02] pl-5 py-2 my-6 italic text-[#b0b3c0]">$1</blockquote>');
    
    // List Items
    html = html.replace(/^\- (.*$)/gim, '<li class="list-disc ml-6 my-2 text-[#b0b3c0]">$1</li>');
    
    // Newlines to breaks
    const lines = html.split('\n');
    let output = [];
    let inList = false;

    for (let line of lines) {
        if (line.trim().startsWith('<li')) {
            if (!inList) {
                output.push('<ul class="space-y-2 my-6">');
                inList = true;
            }
            output.push(line);
        } else {
            if (inList) {
                output.push('</ul>');
                inList = false;
            }
            if (line.trim() && !line.trim().startsWith('<h') && !line.trim().startsWith('<blockquote') && !line.trim().startsWith('<pre')) {
                output.push(`<p class="leading-relaxed text-[#b0b3c0] mb-5">${line}</p>`);
            } else {
                output.push(line);
            }
        }
    }
    if (inList) output.push('</ul>');
    return output.join('\n');
}

export default function BlogPostDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await api.public_getBlogDetail(slug);
                if (response.success) {
                    setPost(response.data);
                }
            } catch (err) {
                console.error('Failed to load blog post:', err);
                setError('Failed to load article. It might have been removed.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-bg">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-mint border-t-transparent" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center p-6 gap-4 z-10 relative">
                <AlertCircle size={48} className="text-red-400" />
                <h1 className="text-xl font-bold text-white">Post Not Found</h1>
                <p className="text-sm text-sub max-w-sm">{error || "This article doesn't exist."}</p>
                <Link to="/blog" className="outline-btn text-xs px-4 py-2 flex items-center gap-1">
                    <ChevronLeft size={14} /> Back to Blog
                </Link>
            </div>
        );
    }

    const postSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.cover_image_url || "https://nowicstdio.tech/image.png",
        "datePublished": post.created_at,
        "dateModified": post.updated_at,
        "author": {
            "@type": "Organization",
            "name": "Nowic Studio Team",
            "url": "https://nowicstdio.tech"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Nowic Studio",
            "logo": {
                "@type": "ImageObject",
                "url": "https://nowicstdio.tech/image.png"
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-bg selection:bg-mint/30">
            <SEO 
                title={`${post.title} | Nowic Studio Blog`}
                description={post.excerpt}
                canonicalUrl={`https://nowicstdio.tech/blog/${post.slug}`}
                schema={postSchema}
            />

            {/* ── Background Elements ── */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div 
                    className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-mint/5 blur-[120px]"
                />
                <div className="absolute inset-0 opacity-[0.02] dot-grid" />
            </div>

            {/* ── Content ── */}
            <article className="container-shell pt-32 pb-32 z-10 relative max-w-3xl">
                
                {/* Back button and Share */}
                <div className="flex items-center justify-between mb-8">
                    <Link 
                        to="/blog" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sub hover:text-white transition-colors"
                    >
                        <ChevronLeft size={14} /> Back to Blog
                    </Link>
                    <button 
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 text-xs text-sub hover:text-white transition-colors rounded-xl border border-white/5 bg-white/[0.02] px-3 py-1.5"
                    >
                        {copied ? <><Check size={12} className="text-mint" /> Copied link</> : <><Share2 size={12} /> Share</>}
                    </button>
                </div>

                {/* Cover Image */}
                {post.cover_image_url && (
                    <div className="w-full rounded-3xl overflow-hidden border border-white/10 bg-[#16171e] mb-10 aspect-[2/1]">
                        <img 
                            src={post.cover_image_url} 
                            alt={post.title} 
                            className="h-full w-full object-cover" 
                        />
                    </div>
                )}

                {/* Article Header */}
                <div className="space-y-4 border-b border-white/10 pb-8 mb-10">
                    <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl md:text-5xl leading-tight tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} /> {post.read_time_minutes} min read
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Eye size={12} /> {post.views_count} Views
                        </span>
                    </div>
                </div>

                {/* Article Body */}
                <div 
                    className="blog-post-body prose prose-invert max-w-none text-sub mb-16"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                />

                {/* Bottom CTA / Author footer */}
                <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-mint font-display font-black">
                            NS
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Written by Nowic Studio Team</p>
                            <p className="text-xs text-muted">Building premium software products & MVPs</p>
                        </div>
                    </div>
                    <Link to="/contact" className="cta-btn text-xs flex items-center gap-1">
                        Start Your Project <ArrowRight size={14} />
                    </Link>
                </div>

            </article>
        </div>
    );
}
