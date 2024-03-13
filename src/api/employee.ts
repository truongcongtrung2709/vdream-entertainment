/* eslint-disable import/no-extraneous-dependencies */
import useSWR, { mutate } from 'swr';
import { useCallback, useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IEmployeeItem } from 'src/types/employee';
import axios from 'axios';




// ----------------------------------------------------------------------

export function useGetEmployees() {
  const URL = endpoints.employee.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      employees: (data?.data as IEmployeeItem[]) || [],
      employeesLoading: isLoading,
      employeesError: error,
      employeesValidating: isValidating,
      employeesEmpty: !isLoading && !data?.data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetEmployee(employeeId: number) {
  const URL = `${endpoints.employee.details}/${employeeId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);


  const memoizedValue = useMemo(
    () => ({
      employee: data as IEmployeeItem,
      employeeLoading: isLoading,
      employeeError: error,
      employeeValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function addEmployee(formData: FormData) {
  const URL = endpoints.employee.add;

  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error adding Employee:', error);
      throw error;
    });
}

export function updateEmployee(id: number | string, formData: FormData) {
  const URL = `${endpoints.employee.update}/${id}`;

  // Assuming newData is the updated data for Employee with ID 1

  return axiosInstance.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating Employee:', error);
      throw error;
    });
}


export function useDeleteEmployee() {
  const deleteEmployee = async (employeeId: number) => {
    const URL = `${endpoints.employee.delete}/${employeeId}`;

    try {
      await axiosInstance.post(URL);

      return true;
    } catch (error) {
      console.error('Error deleting Employee:', error);
      throw new Error('Deletion failed');
    }
  };

  return deleteEmployee;
}