import { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useAuth } from '../../hooks/useAuth';
import { fetchSection, saveSection } from '../../lib/cms';
import { Save, Plus, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';

// Default data used for seeding if the DB is empty
import { servicePricing, generalTiers, deliveryLifecycle } from '../../data/pricingData';

export default function PricingEditor() {
  const { admin } = useAdminAuth();
  const { getApiToken } = useAuth();
  const [data, setData] = useState(null);
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [jsonError, setJsonError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const dbData = await fetchSection('pricingData');
      if (dbData) {
        setData(dbData);
        setJsonText(JSON.stringify(dbData, null, 2));
      } else {
        // Fallback to empty state
        const emptyData = {
          generalTiers: [],
          deliveryLifecycle: [],
          servicePricing: {}
        };
        setData(emptyData);
        setJsonText(JSON.stringify(emptyData, null, 2));
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
      const apiToken = await getApiToken();
      await saveSection('pricingData', template, apiToken);
      setData(template);
      setJsonText(JSON.stringify(template, null, 2));
      toast.success('Successfully seeded default pricing data');
    } catch (err) {
      toast.error('Failed to seed data');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (jsonError) {
      toast.error('Cannot save: Invalid JSON format');
      return;
    }
    setSaving(true);
    try {
      const apiToken = await getApiToken();
      await saveSection('pricingData', data, apiToken);
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
            disabled={saving || jsonError}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${jsonError ? 'bg-red-500/50 text-white cursor-not-allowed' : 'bg-[#34d99a] text-[#050806] hover:bg-[#2cb27e]'}`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
             <div>
                <h2 className="text-xl font-bold text-white mb-1">Raw Configuration (JSON)</h2>
                <p className="text-sm text-[#8b8fa3]">Edit the JSON directly. Ensure quotes and brackets are correct.</p>
             </div>
             {jsonError && <span className="text-red-400 text-sm font-medium">Invalid JSON! Please fix syntax errors before saving.</span>}
          </div>
          
          <textarea
            value={jsonText}
            onChange={(e) => {
              const val = e.target.value;
              setJsonText(val);
              try {
                setData(JSON.parse(val));
                setJsonError(false);
              } catch (err) {
                setJsonError(true);
              }
            }}
            className={`w-full h-[600px] bg-[#0A0F0C] font-mono text-sm p-4 rounded-xl border outline-none ${jsonError ? 'text-red-400 border-red-500/50 focus:border-red-500' : 'text-[#34d99a] border-white/10 focus:border-[#34d99a] focus:ring-1 focus:ring-[#34d99a]'}`}
          />
        </section>
      </div>
    </div>
  );
}
