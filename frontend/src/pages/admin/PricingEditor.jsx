import { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchSection, saveSection } from '../../lib/cms';
import { Save, Plus, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';

// Default data used for seeding if the DB is empty
import { servicePricing, generalTiers, deliveryLifecycle } from '../../data/pricingData';

export default function PricingEditor() {
  const { token } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const dbData = await fetchSection('pricingData');
      if (dbData) {
        setData(dbData);
      } else {
        // Fallback to empty state
        setData({
          generalTiers: [],
          deliveryLifecycle: [],
          servicePricing: {}
        });
      }
    } catch (err) {
      toast.error('Failed to load pricing data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const seedDefaultData = async () => {
    const confirm = window.confirm("This will overwrite current pricing data with the default template. Are you sure?");
    if (!confirm) return;

    setSaving(true);
    try {
      const template = {
        generalTiers,
        deliveryLifecycle,
        servicePricing
      };
      await saveSection('pricingData', template, token);
      setData(template);
      toast.success('Successfully seeded default pricing data');
    } catch (err) {
      toast.error('Failed to seed data');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection('pricingData', data, token);
      toast.success('Pricing data saved successfully');
    } catch (err) {
      toast.error('Failed to save pricing data');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading pricing configuration...</div>;
  if (!data) return <div className="p-8 text-white">No data available.</div>;

  return (
    <div className="p-8 bg-[#050806] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Pricing Models</h1>
          <p className="text-[#8b8fa3]">Manage global pricing tiers, delivery lifecycles, and service-specific packages.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={seedDefaultData}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Seed Default Data
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#34d99a] text-[#050806] rounded-lg font-medium hover:bg-[#2cb27e] transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {/* We can build out full JSON tree editors here if needed, but for now a simple JSON editor handles everything perfectly for complex nested structures until the UI is built out */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Raw Configuration (JSON)</h2>
          <p className="text-sm text-[#8b8fa3] mb-4">Advanced editor for all pricing structures (Tiers, Lifecycle, Packages).</p>
          <textarea
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                setData(JSON.parse(e.target.value));
              } catch (err) {
                // Ignore invalid JSON while typing
              }
            }}
            className="w-full h-[600px] bg-[#0A0F0C] text-[#34d99a] font-mono text-sm p-4 rounded-xl border border-white/10 focus:border-[#34d99a] focus:ring-1 focus:ring-[#34d99a] outline-none"
          />
        </section>
      </div>
    </div>
  );
}
