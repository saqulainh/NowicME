"""
apps/public/sitemap.py

Dynamic XML sitemap generator.
Serves sitemap.xml at /sitemap.xml — auto-includes:
  - Static pages (home, services, portfolio, about, contact, booking, blog)
  - All published BlogPost slugs (dynamic)
  - All active ServiceOffering slugs (dynamic)
"""
from django.http import HttpResponse
from django.utils import timezone
from django.views import View

SITE_URL = "https://nowicstdio.tech"


def _url_entry(loc: str, lastmod: str = None, changefreq: str = "monthly", priority: str = "0.7") -> str:
    parts = [f"  <url>"]
    parts.append(f"    <loc>{loc}</loc>")
    if lastmod:
        parts.append(f"    <lastmod>{lastmod}</lastmod>")
    parts.append(f"    <changefreq>{changefreq}</changefreq>")
    parts.append(f"    <priority>{priority}</priority>")
    parts.append(f"  </url>")
    return "\n".join(parts)


class SitemapView(View):
    """Render and serve a dynamic sitemap.xml."""

    def get(self, request):
        today = timezone.now().date().isoformat()

        urls = []

        # ── Static pages ─────────────────────────────────────────────────────
        static_pages = [
            ("", "weekly", "1.0"),
            ("/services", "weekly", "0.9"),
            ("/portfolio", "monthly", "0.8"),
            ("/about", "monthly", "0.7"),
            ("/contact", "monthly", "0.7"),
            ("/booking", "monthly", "0.7"),
            ("/blog", "daily", "0.9"),
        ]
        for path, freq, prio in static_pages:
            urls.append(_url_entry(f"{SITE_URL}{path}", today, freq, prio))

        # ── Dynamic: Published Blog Posts ─────────────────────────────────────
        try:
            from apps.public.models import BlogPost
            posts = BlogPost.objects.filter(is_published=True).values("slug", "updated_at")
            for post in posts:
                lastmod = post["updated_at"].date().isoformat() if post["updated_at"] else today
                urls.append(_url_entry(
                    f"{SITE_URL}/blog/{post['slug']}",
                    lastmod=lastmod,
                    changefreq="monthly",
                    priority="0.8"
                ))
        except Exception:
            pass

        # ── Dynamic: Active Services ──────────────────────────────────────────
        try:
            from apps.public.models import ServiceOffering
            services = ServiceOffering.objects.filter(is_active=True).values("slug")
            for svc in services:
                urls.append(_url_entry(
                    f"{SITE_URL}/services#{svc['slug']}",
                    lastmod=today,
                    changefreq="monthly",
                    priority="0.6"
                ))
        except Exception:
            pass

        xml = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "\n".join(urls) + "\n"
            "</urlset>"
        )

        return HttpResponse(xml, content_type="application/xml")
