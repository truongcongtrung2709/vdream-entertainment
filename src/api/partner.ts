/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IPartnerItem } from 'src/types/partner';




// ----------------------------------------------------------------------

export function useGetPartners() {
  const URL = endpoints.partner.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      partners: (data?.data as IPartnerItem[]) || [],
      partnersLoading: isLoading,
      partnersError: error,
      partnersValidating: isValidating,
      partnersEmpty: !isLoading && !data?.data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetPartner(partnerId: number) {
  const URL = `${endpoints.partner.details}/${partnerId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);


  const memoizedValue = useMemo(
    () => ({
      partner: data as IPartnerItem,
      partnerLoading: isLoading,
      partnerError: error,
      partnerValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useDeletePartner() {
  const deletePartner = async (partnerId: number) => {
    const URL = `${endpoints.partner.delete}/${partnerId}`;

    try {
      await axiosInstance.post(URL);

      return true;
    } catch (error) {
      console.error('Error deleting Partner:', error);
      throw new Error('Deletion failed');
    }
  };

  return deletePartner;
}

export function addPartner(formData: FormData) {
  const URL = endpoints.partner.add;

  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error adding partner:', error);
      throw error;
    });
}

export function updatePartner(id: number | undefined, formData: FormData) {
  const URL = `${endpoints.partner.update}/${id}`;

  // Assuming newData is the updated data for partner with ID 1

  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating Partner:', error);
      throw error;
    });
}