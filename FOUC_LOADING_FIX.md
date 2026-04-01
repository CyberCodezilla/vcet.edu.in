# Resolving Flash of Old Content (FOUC) in React

## The Problem
When integrating dynamic CMS data from the Laravel backend into our React frontend, a visual glitch known as **FOUC** (Flash of Unstyled/Old Content) occurred.

Before this fix, the sequence of events was:
1. User visits the page.
2. **Instant Render**: React immediately renders the hardcoded/default UI state because the API data hasn't arrived yet (`data` is `null`).
3. **Background API Call**: The frontend sends an asynchronous request to the Laravel backend requesting CMS overrides (taking ~0.5s).
4. **Sudden Snap**: The API returns data, updating the React state. The UI violently snaps and replaces the old default content with the new CMS content.

## The Solution
To fix this, a uniform "Gatekeeper" Loading State was introduced across all CMS-integrated pages (e.g., all 12 MMS Student Life pages).

### Step 1: Introduce a Loading State Variable
We added a new React state variable initialized to `true` to block the rendering pipeline by default.

```tsx
const [data, setData] = useState<MMSStudentsLifeData | null>(null);
const [loading, setLoading] = useState(true); // Gatekeeper state added
```

### Step 2: Update the API Fetch Hook
We updated the asynchronous `fetchData` function to guarantee that the `loading` gate is lifted **only after** the API request finishes, using a `finally` block. This ensures it unlocks even if the API throws an error.

```tsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await get<{ data: MMSStudentsLifeData }>('/pages/mms-students-life');
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch students life data:', err);
    } finally {
      // Regardless of success or failure, stop loading!
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Step 3: Implement Conditional Spinner Rendering
Finally, right before the component attempts to render the main page layout, we added an early `return` condition. 

If `loading` is still `true`, React bypasses rendering the page contents and instead serves a stylized Pulse/Spinner UI. Once `setLoading(false)` fires, React re-renders, bypasses this `if` block, and paints the final guaranteed page.

```tsx
if (loading) {
  return (
    <MMSLayout title="Loading...">
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin"></div>
          <div className="text-slate-400 font-medium tracking-widest uppercase text-sm">Loading Content...</div>
        </div>
      </div>
    </MMSLayout>
  );
}

// ... actual page layout rendering continues here ...
return (
  <MMSLayout title="Loaded Page">
    {/* Page Content */}
  </MMSLayout>
)
```

## Automating the Fix
Since this needed to be applied to over a dozen pages, a customized Node.js regular expression script (`update_loading.cjs`) was used to scan all target `.tsx` files, safely inject the three code blocks above, and immediately save the formatting across the entire module.
