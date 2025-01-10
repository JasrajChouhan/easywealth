import { useState } from 'react';
import { toast } from 'sonner';

export const useFetch = (cb: (data: any) => Promise<any>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState();

  const fn = async (...args: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cb(...args);
      setData(data);
    } catch (error: any) {
      setError(error?.message as string);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, fn };
};
