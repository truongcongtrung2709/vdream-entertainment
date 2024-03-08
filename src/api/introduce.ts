import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IIntroduceItem } from 'src/types/introduce';

// ----------------------------------------------------------------------

export function useGetIntroduces() {
  const URL = endpoints.introduce.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      introduces: (data as IIntroduceItem[]) || [],
      introducesLoading: isLoading,
      introducesError: error,
      introducesValidating: isValidating,
      introducesEmpty: !isLoading && !data.length,
      refreshIntroduces: mutate,
    }),
    [data?.products, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------
export function updateIntroduce(id: number, newData: IIntroduceItem) {
  const URL = `${endpoints.introduce.update}/${id}`;

  // Assuming newData is the updated data for introduce with ID 1

  return axiosInstance.post(URL, newData)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating introduce:', error);
      throw error;
    });
}

// ----------------------------------------------------------------------