import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const ContentContext = createContext(null);

/* Icon map — we store icon *names* in DB, resolve to components here */
import {
    Bot, Building2, LayoutDashboard, Rocket, Gauge, ShieldCheck,
    Cpu, Layers, Sparkles, Code2, Globe, Zap, Trophy, Users, Star,
} from 'lucide-react';

const ICON_MAP = {
    Bot, Building2, LayoutDashboard, Rocket, Gauge, ShieldCheck,
    Cpu, Layers, Sparkles, Code2, Globe, Zap, Trophy, Users, Star,
};

function resolveIcon(name) {
    return ICON_MAP[name] || Rocket;
}

function attachIcons(items, iconField = 'icon') {
    if (!Array.isArray(items)) return items;
    return items.map((item) => ({
        ...item,
        [iconField]: typeof item[iconField] === 'string' ? resolveIcon(item[iconField]) : item[iconField],
    }));
}

function normalizeServices(items) {
    if (!Array.isArray(items)) return items;
    return items.map((item) => ({
        ...item,
        name: item.name || item.title || '',
        tagline: item.tagline || item.headline || '',
        icon_name: item.icon_name || item.icon || 'Rocket',
        price_starting: item.price_starting ?? item.startingPrice ?? null,
        delivery_days: item.delivery_days ?? item.deliveryTime ?? null,
    }));
}

import { useQuery } from '@tanstack/react-query';

export function ContentProvider({ children }) {
    const { data: content, isLoading: loading, refetch } = useQuery({
        queryKey: ['siteContent'],
        queryFn: async () => {
            const [contentRes, statsRes, reviewsRes] = await Promise.allSettled([
                api.getSiteContent(),
                api.getStats(),
                api.public_getReviews(),
            ]);

            const rows = contentRes.status === 'fulfilled' ? (contentRes.value?.data || []) : [];
            const liveStats = statsRes.status === 'fulfilled' ? (statsRes.value?.data || {}) : {};
            const liveReviews = reviewsRes.status === 'fulfilled' ? (reviewsRes.value?.data || []) : [];

            const merged = { liveStats, reviews: liveReviews };
            rows.forEach((row) => {
                if (row.section && row.data !== undefined) {
                    let val = row.data;
                    if (row.section === 'services') {
                        val = normalizeServices(val);
                        val = attachIcons(val, 'icon');
                    } else if (['stats', 'highlights', 'whyUs'].includes(row.section)) {
                        val = attachIcons(val);
                    }
                    merged[row.section] = val;
                }
            });
            return merged;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    return (
        <ContentContext.Provider value={{ content: content || {}, loading, refetch }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) {
        return { content: {}, loading: false, refetch: async () => {} };
    }
    return ctx;
}

export default ContentContext;
