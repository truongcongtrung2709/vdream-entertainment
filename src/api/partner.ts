/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IPartnerItem } from 'src/types/partner';




// ----------------------------------------------------------------------

export function useGetPartners() {
  const URL = endpoints.partner.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      partners: (data as IPartnerItem[]) || [],
      partnersLoading: isLoading,
      partnersError: error,
      partnersValidating: isValidating,
      partnersEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

