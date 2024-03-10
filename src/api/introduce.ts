import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IIntroduceItem } from 'src/types/introduce';
import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

export function useGetIntroduces() {
  const URL = endpoints.introduce.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      introduces: data?.data as IIntroduceItem[] || [],
      introducesLoading: isLoading,
      introducesError: error,
      introducesValidating: isValidating,
      introducesEmpty: !isLoading && !data.data,
      refreshIntroduces: mutate,
    }),
    [data?.products, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------
export function updateIntroduce(id: number, formData: FormData) {
  const URL = `${endpoints.introduce.update}/${id}`;

  // Assuming newData is the updated data for introduce with ID 1

  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating introduce:', error);
      throw error;
    });
}

// ----------------------------------------------------------------------