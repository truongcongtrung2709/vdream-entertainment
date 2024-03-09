/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IItem } from 'src/types/item';




// ----------------------------------------------------------------------

export function useGetItems() {
  const URL = endpoints.item.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      items: (data?.data as IItem[]) || [],
      itemsLoading: isLoading,
      itemsError: error,
      itemsValidating: isValidating,
      itemsEmpty: !isLoading && !data?.data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetItem(itemId: number) {
  const URL = `${endpoints.item.details}/${itemId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);


  const memoizedValue = useMemo(
    () => ({
      item: data as IItem,
      itemLoading: isLoading,
      itemError: error,
      itemValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useDeleteItem() {
  const deleteItem = async (ItemId: number) => {
    const URL = `${endpoints.item.delete}/${ItemId}`;
    console.log(URL);

    try {
      await axiosInstance.post(URL);

      return true;
    } catch (error) {
      console.error('Error deleting Item:', error);
      throw new Error('Deletion failed');
    }
  };

  return deleteItem;
}

export function updateItem(id: number | undefined, formData: FormData) {
  const URL = `${endpoints.item.update}/${id}`;


  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating Item:', error);
      throw error;
    });
}
export function addItem(formData: FormData) {
  const URL = endpoints.item.add;

  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error adding item:', error);
      throw error;
    });
}