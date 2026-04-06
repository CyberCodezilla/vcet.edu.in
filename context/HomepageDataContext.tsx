import React, { createContext, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { EMPTY_HOMEPAGE_DATA, homepageService, type HomepageData } from '../services/homepage';

interface HomepageDataContextValue {
  data: HomepageData;
  loading: boolean;
  error: string | null;
}

const HomepageDataContext = createContext<HomepageDataContextValue | null>(null);

export const HomepageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading, error } = useFetch<HomepageData>(() => homepageService.get(), {
    initialData: EMPTY_HOMEPAGE_DATA,
    cacheKey: 'public:homepage:data',
    refreshIntervalMs: 30_000,
  });

  return (
    <HomepageDataContext.Provider value={{ data, loading, error }}>
      {children}
    </HomepageDataContext.Provider>
  );
};

export function useHomepageData() {
  return useContext(HomepageDataContext);
}
