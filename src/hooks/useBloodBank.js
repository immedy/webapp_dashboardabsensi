// ==============================|| CUSTOM HOOK - BLOOD BANK ||============================== //

import { useState, useEffect, useCallback } from 'react';
import { handleApiError, showSuccess } from '../utils/errorHandler';

/**
 * Custom hook for data fetching with loading and error states
 * @param {Function} fetchFn - Function to fetch data
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} { data, loading, error, refetch }
 */
export const useDataFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.message || 'Gagal mengambil data');
      }
    } catch (err) {
      setError(err);
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Custom hook for form submission with loading state
 * @param {Function} submitFn - Function to submit form
 * @param {Function} onSuccess - Callback on success
 * @returns {Object} { submit, loading, error }
 */
export const useFormSubmit = (submitFn, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (data, successMessage = 'Data berhasil disimpan') => {
    try {
      setLoading(true);
      setError(null);
      const result = await submitFn(data);
      if (result.success) {
        showSuccess(successMessage);
        if (onSuccess) {
          onSuccess(result.data);
        }
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Gagal menyimpan data');
      }
    } catch (err) {
      setError(err);
      handleApiError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [submitFn, onSuccess]);

  return { submit, loading, error };
};

/**
 * Custom hook for delete confirmation
 * @param {Function} deleteFn - Function to delete data
 * @param {Function} onSuccess - Callback on success
 * @returns {Object} { deleteItem, loading }
 */
export const useDelete = (deleteFn, onSuccess) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = useCallback(async (id, itemName = 'Data') => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus ${itemName}?`)) {
      return { success: false, cancelled: true };
    }

    try {
      setLoading(true);
      const result = await deleteFn(id);
      if (result.success) {
        showSuccess('Data berhasil dihapus');
        if (onSuccess) {
          onSuccess();
        }
        return { success: true };
      } else {
        throw new Error(result.message || 'Gagal menghapus data');
      }
    } catch (err) {
      handleApiError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [deleteFn, onSuccess]);

  return { deleteItem, loading };
};
