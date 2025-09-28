import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useEmissionsStore = create(
  persist(
    (set, get) => ({
      // Current emission data
      currentEmission: null,
      emissionData: null,
      calculationType: null,
      timestamp: null,

      // Set emission data
      setEmissionData: (data) => set({
        currentEmission: data?.result?.data?.emissions?.co2e_mt || 0,
        emissionData: data,
        calculationType: data?.calculationType || 'flight',
        timestamp: new Date().toISOString()
      }),

      // Clear emission data
      clearEmissionData: () => set({
        currentEmission: null,
        emissionData: null,
        calculationType: null,
        timestamp: null
      }),

      // Get formatted emission value
      getFormattedEmission: () => {
        const { currentEmission } = get();
        return currentEmission ? currentEmission.toFixed(2) : '0.00';
      },

      // Check if data is valid (not expired)
      isDataValid: () => {
        const { timestamp } = get();
        if (!timestamp) return false;
        
        const now = new Date();
        const dataTime = new Date(timestamp);
        const diffInMinutes = (now - dataTime) / (1000 * 60);
        
        // Data expires after 30 minutes
        return diffInMinutes < 30;
      }
    }),
    {
      name: 'emissions-storage',
      // Only persist essential data
      partialize: (state) => ({
        currentEmission: state.currentEmission,
        timestamp: state.timestamp,
        calculationType: state.calculationType
      })
    }
  )
);

export default useEmissionsStore;