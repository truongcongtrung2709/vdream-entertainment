import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';
import { IAboutItem } from 'src/types/about';


// ----------------------------------------------------------------------

export function useGetAbouts() {
  const URL = endpoints.about.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      abouts: (data?.data as IAboutItem[]) || [],
      aboutsLoading: isLoading,
      aboutsError: error,
      aboutsValidating: isValidating,
      aboutsEmpty: !isLoading && !data?.data,
      refreshAbouts: mutate,
    }),
    [data?.products, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------
export function updateAbout(id: number, formData: FormData) {
  const URL = `${endpoints.about.update}/${id}`;


  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating about:', error);
      throw error;
    });
}

// ----------------------------------------------------------------------