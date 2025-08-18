import { create } from 'zustand';

const useOffsetStore = create((set) => ({
    projects: [],
    defaultProjects: [],
    loading: false,
    error: null,

    fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
            // Fetch active projects
            const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/offset/projects/?is_active=true`);
            if (!projectsRes.ok) throw new Error('Failed to fetch projects');

            const projectsData = await projectsRes.json();

            // default projects
            const defaultRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/offset/projects/?is_active=true&is_default=true`);
            if (!defaultRes.ok) throw new Error('Failed to fetch default projects');

            const defaultData = await defaultRes.json();

            set({
                projects: projectsData.data || [],
                defaultProjects: defaultData.data || [],
                loading: false
            });
        } catch (err) {
            set({ error: err.message, loading: false });
            console.error('Error fetching offset projects:', err);
        }
    },

    // <----  QUOTE FUNCTION ---->
    createOffsetQuote: async ({ project_id, carbon_emission_metric_tons }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/offset/quote/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_id,
                    carbon_emission_metric_tons
                }),
            });
            if (!response.ok) throw new Error('Failed to get offset quote');
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error getting offset quote:', err);
            throw err;
        }
    },

    // Confirm function
    confirmOffsetQuote: async (payload) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/offset/confirm/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Failed to confirm offset quote');
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error confirming offset quote:', err);
            throw err;
        }
    },
}));

export default useOffsetStore;