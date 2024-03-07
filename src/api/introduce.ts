import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IIntroduceItem } from 'src/types/introduce';

// ----------------------------------------------------------------------

export function useGetIntroduces() {
  const URL = endpoints.introduce.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      introduces: (data as IIntroduceItem[]) || [],
      introducesLoading: isLoading,
      introducesError: error,
      introducesValidating: isValidating,
      introducesEmpty: !isLoading && !data.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

