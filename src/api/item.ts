/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IItem } from 'src/types/item';




// ----------------------------------------------------------------------

export function useGetItems() {
  const URL = endpoints.item.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      items: (data as IItem[]) || [],
      itemsLoading: isLoading,
      itemsError: error,
      itemsValidating: isValidating,
      itemsEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

