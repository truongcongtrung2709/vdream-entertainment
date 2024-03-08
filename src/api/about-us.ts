/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IAboutItem } from 'src/types/about';




// ----------------------------------------------------------------------

export function useGetAbouts() {
  const URL = endpoints.about.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      abouts: (data as IAboutItem[]) || [],
      aboutsLoading: isLoading,
      aboutsError: error,
      aboutsValidating: isValidating,
      aboutsEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

