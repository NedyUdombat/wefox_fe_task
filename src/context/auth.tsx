import React, { createContext, useState, useContext, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';

import { http } from '../api/client';

type ContextData = {
  responseData: ResponseData[];
  responseDatum?: ResponseData;
  responseError?: any;
  loading: boolean;
  addData: (payload: FieldValues | Payload) => Promise<void>;
  updateData: (payload: FieldValues | Payload, id: number) => Promise<void>;
  fetchDatum: (payload: FieldValues | number) => Promise<void>;
  removeData: (payload: FieldValues | number) => Promise<void>;
};

export type ResponseData = {
  content: string;
  created_at?: Date;
  id: number;
  image_url: string;
  lat: string;
  long: string;
  title: string;
  updated_at?: Date;
};

export type Payload = {
  content: string;
  image_url?: string;
  lat?: string;
  long?: string;
  title: string;
};

const DataContext = createContext<ContextData>({} as ContextData);

const DataProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [responseData, setResponseData] = useState<ResponseData[]>([]);
  const [responseDatum, setResponseDatum] = useState<ResponseData>();
  const [responseError, setResponseError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await http.get('/posts');
      setResponseData(data);
    } catch (error) {
      console.log(error);
      setResponseError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDatum = async (payload: FieldValues | number) => {
    try {
      setLoading(true);
      const { data } = await http.get(`/posts/${payload}`);
      setResponseDatum(data);
    } catch (error) {
      console.log(error);
      setResponseError(error);
    } finally {
      setLoading(false);
    }
  };

  const addData = async (payload: FieldValues | Payload) => {
    try {
      // setLoading(true);
      const { data } = await http.post('/posts', payload);
      setResponseData([...responseData, data]);
    } catch (error) {
      console.log(error);
      setResponseError(error);
    } finally {
      // setLoading(false);
    }
  };

  const updateData = async (payload: FieldValues | Payload, id: number) => {
    try {
      // setLoading(true);

      const newPayload = {
        content: payload.content,
        image_url: payload.image_url,
        lat: payload.lat,
        long: payload.long,
        title: payload.title,
      };
      const { data } = await http.put(`/posts/${id}`, newPayload);
      const newResponseData = responseData.map((item) => {
        if (item.id === id) {
          item = data;
        }
        return item;
      });
      setResponseData(newResponseData);
    } catch (error) {
      console.log(error);
      setResponseError(error);
    } finally {
      // setLoading(false);
    }
  };

  const removeData = async (payload: FieldValues | number) => {
    try {
      await http.delete(`/posts/${payload}`);

      const newResponseData = responseData.filter(
        (item) => item.id !== payload,
      );
      setResponseData([...newResponseData]);
    } catch (error) {
      console.log(error);
      setResponseError(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        responseData,
        responseError,
        addData,
        removeData,
        fetchDatum,
        updateData,
        responseDatum,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

function useData(): ContextData {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
}

export { DataContext, DataProvider, useData };
