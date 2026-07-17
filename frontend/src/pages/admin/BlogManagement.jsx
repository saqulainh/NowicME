import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Eye, Calendar, BookOpen, Globe, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function BlogManagement() {
    const navigate = useNavigate();
    const { getApiToken } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [statusFilter]);

    const fetchPosts = async () => {
        setLoading(true);
        setError('');
        try {
            const token = await getApiToken();
            const response = await api.admin_getBlogs(token, {
                search: search || undefined,
                status: statusFilter || undefined
            });
            if (response.success) {
                // If backend paginates, the data is in results
                setPosts(response.data.results || response.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch blog posts:', err);
            setError('Failed to load blog posts.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts();
    };

    const togglePublishStatus = async (post) => {
        try {
            const token = await getApiToken();
            const response = await api.admin_updateBlog(token, post.id, {
                is_published: !post.is_published
            });
            if (response.success) {
                setPosts(prev => prev.map(p => p.id === post.id ? { ...p, is_published: response.data.is_published } : p));
            }
        } catch (err) {
            alert('Failed to update post: ' + err.message);
        }
    };

    const handleDelete = async (postId) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        try {
            const token = await getApiToken();
            const response = await api.admin_deleteBlog(token, postId);
            if (response.success) {
                setPosts(prev => prev.filter(p => p.id !== postId));
            }
        } catch (err) {
            alert('Failed to delete post: ' + err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#f0f0f3] tracking-tight">Blog CMS</h1>
                    <p className="mt-1 text-sm text-[#6b6f80]">Write and publish SEO articles to drive organic search</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/blog/new')}
                    className="admin-add-btn text-xs px-4 py-2 flex items-center gap-1.5"
                >
                    <Plus size={14} /> New Article
                </button>
            </div>

            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle size={14} /> {error}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <form onSubmit={handleSearch} className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4e5e]" size={16} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search posts by title or excerpt..." 
                        className="w-full rounded-xl border border-[#1e2028] bg-[#0e0f14] py-2.5 pl-10 pr-4 text-sm text-[#f0f0f3] outline-none focus:border-[#34d99a]/40"
                    />
                </form>
                <div className="flex gap-2">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-xl border border-[#1e2028] bg-[#0e0f14] px-4 py-2.5 text-sm text-[#f0f0f3] outline-none focus:border-[#34d99a]/40"
                    >
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Drafts</option>
                    </select>
                </div>
            </div>

            {/* Grid list of blog posts */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="stats-glass p-5 border border-white/5 rounded-xl space-y-4 animate-pulse">
                            <div className="h-40 w-full bg-[#15161b] rounded-lg" />
                            <div className="h-4 w-2/3 bg-[#1e2028] rounded" />
                            <div className="h-3 w-full bg-[#1e2028] rounded" />
                        </div>
                    ))
                ) : posts.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-[#6b6f80] flex flex-col items-center justify-center gap-3">
                        <BookOpen size={40} className="text-[#3c3e4f]" />
                        <p>No blog posts found. Create your first post to get started!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div 
                            key={post.id} 
                            className="stats-glass border border-white/5 bg-[#0e0f14]/50 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-[#34d99a]/20 transition-all duration-350"
                        >
                            {/* Image Placeholder or Image */}
                            <div className="relative h-40 bg-[#16171e] flex items-center justify-center border-b border-white/5 overflow-hidden">
                                {post.cover_image_url ? (
                                    <img 
                                        src={post.cover_image_url} 
                                        alt={post.title} 
                                        className="h-full w-full object-cover" 
                                    />
                                ) : (
                                    <FileText size={36} className="text-[#3c3e4f]" />
                                )}
                                <span className={`absolute top-3 left-3 flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wider shadow-lg ${
                                    post.is_published 
                                        ? 'bg-[#34d99a]/10 text-[#34d99a] border border-[#34d99a]/20' 
                                        : 'bg-white/5 text-[#8b8fa3] border border-white/5'
                                }`}>
                                    {post.is_published ? <><Globe size={8} /> Published</> : <><FileText size={8} /> Draft</>}
                                </span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-sm text-[#f0f0f3] line-clamp-2 group-hover:text-[#34d99a] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-[#8b8fa3] line-clamp-2 leading-relaxed">
                                        {post.excerpt || 'No summary provided.'}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between text-[10px] text-[#6b6f80] border-t border-white/5 pt-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} /> {new Date(post.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={10} /> {post.views_count} Views
                                        </span>
                                        <span>
                                            {post.read_time_minutes} min read
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <button
                                            onClick={() => togglePublishStatus(post)}
                                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border transition-colors ${
                                                post.is_published 
                                                    ? 'border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10' 
                                                    : 'border-[#34d99a]/20 bg-[#34d99a]/5 text-[#34d99a] hover:bg-[#34d99a]/10'
                                            }`}
                                        >
                                            {post.is_published ? 'Unpublish' : 'Publish'}
                                        </button>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                                                className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 text-[#b0b3c0] hover:text-[#f0f0f3] transition-colors"
                                                title="Edit article"
                                            >
                                                <Edit size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-1.5 rounded-lg border border-white/5 hover:border-red-500/30 text-[#b0b3c0] hover:text-red-400 transition-colors"
                                                title="Delete article"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
