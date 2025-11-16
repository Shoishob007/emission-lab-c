import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOffsetStore = create(
    persist(
        (set, get) => ({
            projects: [],
            defaultProjects: [],
            loading: false,
            error: null,
            quoteData: null,
            offsetSuccessData: null,

            create_account: false,
            certificate_name: "",

            setCreateAccount: (value) => set({ create_account: value }),
            setCertificationName: (value) => set({ certificate_name: value }),
            resetUserInputs: () =>
                set({ create_account: false, certificate_name: "" }),
            // Get current user inputs for confirmation
            getUserInputs: () => {
                const state = get();
                return {
                    create_account: state.create_account,
                    certificate_name: state.certificate_name
                };
            },

            setQuoteData: (data) => set({ quoteData: data }),
            setOffsetSuccess: (data) => set({ offsetSuccessData: data }),

            fetchProjects: async () => {
                set({ loading: true, error: null });
                try {
                    const projectsRes = await fetch(
                        `${process.env.NEXT_PUBLIC_API}/api/offset/projects/?is_active=true`
                    );
                    if (!projectsRes.ok) throw new Error("Failed to fetch projects");
                    const projectsData = await projectsRes.json();

                    const defaultRes = await fetch(
                        `${process.env.NEXT_PUBLIC_API}/api/offset/projects/?is_active=true&is_default=true`
                    );
                    if (!defaultRes.ok) throw new Error("Failed to fetch default projects");
                    const defaultData = await defaultRes.json();

                    set({
                        projects: projectsData.data || [],
                        defaultProjects: defaultData.data || [],
                        loading: false,
                    });
                } catch (err) {
                    set({ error: err.message, loading: false });
                    console.error("Error fetching offset projects:", err);
                }
            },

            createOffsetQuote: async ({ project_id, carbon_emission_metric_tons }) => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API}/api/offset/quote/`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ project_id, carbon_emission_metric_tons }),
                        }
                    );
                    if (!response.ok) throw new Error("Failed to get offset quote");
                    const data = await response.json();
                    console.log("Create quote response :: ", data);
                    return data;
                } catch (err) {
                    console.error("Error getting offset quote:", err);
                    throw err;
                }
            },

            confirmOffsetQuote: async (payload) => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API}/api/offset/confirm/`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        }
                    );
                    if (!response.ok) throw new Error("Failed to confirm offset quote");
                    const data = await response.json();
                    console.log("Confirm quote response :: ", data);
                    get().resetUserInputs();

                    return data;
                } catch (err) {
                    console.error("Error confirming offset quote:", err);
                    throw err;
                }
            },

            createStripeCheckoutSession: async (payload) => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API}/api/offset/stripe/checkout/`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        }
                    );
                    if (!response.ok)
                        throw new Error("Failed to create Stripe checkout session");
                    const data = await response.json();
                    console.log("Stripe Checkout response :: ", data);
                    return data;
                } catch (err) {
                    console.error("Error creating Stripe checkout session:", err);
                    throw err;
                }
            },
        }),
        {
            name: "offset-storage",
        }
    )
);

export default useOffsetStore;
