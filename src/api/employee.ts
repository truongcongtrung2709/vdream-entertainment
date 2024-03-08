/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IEmployeeItem } from 'src/types/employee';




// ----------------------------------------------------------------------

export function useGetEmployees() {
  const URL = endpoints.employee.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      employees: (data as IEmployeeItem[]) || [],
      employeesLoading: isLoading,
      employeesError: error,
      employeesValidating: isValidating,
      employeesEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

