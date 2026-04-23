import { useState, useEffect, useRef } from 'react';
import { Save, CheckCircle2, Plus, Trash2, Star } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../hooks/useAuth';
import { saveSection, fetchSection } from '../../lib/cms';

const emptyProject = {
    title: '',
    category: '',
    description: '',
    tech_stack: [],
    image_url: '',
    is_featured: false,
    live_url: '',
    github_url: '',
};

const CATEGORY_OPTIONS = [
    'MVP Development',
    'Business Website',
    'AI Web App',
    'Admin Dashboard',
    'SaaS Platform',
    'API & Backend',
    'Mobile App',
    'E-Commerce',
    'Other'
];

const createId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `project-${Date.now()}-${Math.random().toString(16).slice(2)}`);

function normalizeProject(item = {}) {
    return {
        id: item.id || createId(),
        ...emptyProject,
        ...item,
        tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack : (Array.isArray(item.tags) ? item.tags : []),
        is_featured: item.is_featured ?? item.featured ?? false,
        live_url: item.live_url || item.demoUrl || '',
        github_url: item.github_url || item.githubUrl || '',
    };
}

export default function PortfolioEditor() {
    const { content = {}, refetch } = useContent();
    const { getApiToken } = useAuth();
    const defaults = content.portfolioItems || [];
    const [items, setItems] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const savedTimeoutRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const data = await fetchSection('portfolioItems');
                if (mounted) {
                    setItems((data || defaults || []).map(normalizeProject));
                }
            } catch (err) {
                console.error('Failed to load portfolio items:', err);
                if (mounted) {
                    setItems((defaults || []).map(normalizeProject));
                }
            }
        })();

        return () => {
            mounted = false;
            if (savedTimeoutRef.current) {
                clearTimeout(savedTimeoutRef.current);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        };
    }, []);

    const update = (idx, field, value) => {
        setItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
        setSaved(false);
    };

    const updateTags = (idx, value) => {
        const tags = value.split(',').map((t) => t.trim()).filter(Boolean);
        update(idx, 'tech_stack', tags);
    };

    const addItem = () => setItems((prev) => [...prev, normalizeProject()]);

    const removeItem = (idx) => {
        if (!confirm('Delete this project?')) return;
        setItems((prev) => prev.filter((_, i) => i !== idx));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        let saveSucceeded = false;

        try {
            const token = await getApiToken();
            await saveSection('portfolioItems', items, token);
            saveSucceeded = true;
            setSaved(true);
            if (savedTimeoutRef.current) {
                clearTimeout(savedTimeoutRef.current);
            }
            savedTimeoutRef.current = setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            alert('Failed to save: ' + err.message);
        } finally {
            if (saveSucceeded) {
                try {
                    await refetch();
                } catch (err) {
                    console.warn('Saved successfully, but failed to refresh data:', err);
                }
            }
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#f0f0f3]">Portfolio</h1>
                    <p className="mt-1 text-sm text-[#6b6f80]">{items.length} projects</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={addItem} className="admin-add-btn"><Plus size={14} /> Add Project</button>
                    <button onClick={handleSave} disabled={saving} className="admin-save-btn">
                        {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> {saving ? 'Saving...' : 'Save'}</>}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div key={item.id} className="rounded-xl border border-[#1e2028] bg-[#0e0f14] p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-[#34d99a]">#{idx + 1}</span>
                                {item.is_featured && (
                                    <span className="flex items-center gap-1 rounded-full bg-[#34d99a]/10 px-2 py-0.5 text-[10px] font-semibold text-[#34d99a]">
                                        <Star size={10} /> Featured
                                    </span>
                                )}
                            </div>
                            <button onClick={() => removeItem(idx)} aria-label="Delete project" className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor={`title-${item.id}`} className="admin-label">Title</label>
                                <input id={`title-${item.id}`} type="text" value={item.title} onChange={(e) => update(idx, 'title', e.target.value)} className="admin-input" placeholder="Project title" />
                            </div>
                            <div>
                                <label htmlFor={`category-${item.id}`} className="admin-label">Category</label>
                                <select id={`category-${item.id}`} value={item.category} onChange={(e) => update(idx, 'category', e.target.value)} className="admin-input">
                                    <option value="">Select...</option>
                                    {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor={`description-${item.id}`} className="admin-label">Description</label>
                                <textarea id={`description-${item.id}`} value={item.description} onChange={(e) => update(idx, 'description', e.target.value)} rows={2} className="admin-input resize-none" placeholder="Project description" />
                            </div>
                            <div>
                                <label htmlFor={`tech_stack-${item.id}`} className="admin-label">Tech Stack (comma-separated)</label>
                                <input id={`tech_stack-${item.id}`} type="text" value={(item.tech_stack || []).join(', ')} onChange={(e) => updateTags(idx, e.target.value)} className="admin-input" placeholder="React, Node.js, PostgreSQL" />
                            </div>
                            <div>
                                <label htmlFor={`image_url-${item.id}`} className="admin-label">Image URL</label>
                                <input id={`image_url-${item.id}`} type="text" value={item.image_url || ''} onChange={(e) => update(idx, 'image_url', e.target.value)} className="admin-input" placeholder="/images/project.png or https://..." />
                            </div>
                            <div className="flex items-end gap-4">
                                <label className="flex items-center gap-2 cursor-pointer" htmlFor={`is_featured-${item.id}`}>
                                    <input
                                        id={`is_featured-${item.id}`}
                                        type="checkbox"
                                        checked={item.is_featured || false}
                                        onChange={(e) => update(idx, 'is_featured', e.target.checked)}
                                        className="h-4 w-4 rounded border-[#1e2028] bg-[#16171e] accent-[#34d99a]"
                                    />
                                    <span className="text-sm text-[#e0e0e8]">Featured Project</span>
                                </label>
                            </div>
                            <div>
                                <label htmlFor={`live_url-${item.id}`} className="admin-label">Live URL</label>
                                <input id={`live_url-${item.id}`} type="url" value={item.live_url || ''} onChange={(e) => update(idx, 'live_url', e.target.value)} className="admin-input" placeholder="https://..." />
                            </div>
                            <div>
                                <label htmlFor={`github_url-${item.id}`} className="admin-label">GitHub URL</label>
                                <input id={`github_url-${item.id}`} type="url" value={item.github_url || ''} onChange={(e) => update(idx, 'github_url', e.target.value)} className="admin-input" placeholder="https://github.com/..." />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
