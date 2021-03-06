// Custom hook from Johannes' lectures

import { useEffect, useState } from "react";

const useLoader = (loadingFunction, deps = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function reload() {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(reload, deps);
  return { data, loading, error, reload };
}

export default useLoader;