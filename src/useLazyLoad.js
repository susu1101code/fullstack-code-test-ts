import { useEffect, useState } from "react";

export function useLazyLoad(ref, fetchUsers, option) {
  const userFetchURL = process.env.REACT_APP_USER_FETCH_URL;

  const [needLazyLoad, setNeedLazyLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!needLazyLoad) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
    fetchUsers(userFetchURL, (currentPage + 1).toString());
  }, [needLazyLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setNeedLazyLoad(entry.isIntersecting);
    }, option);
    const currentRef = ref.current;
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, option]);
  return [needLazyLoad, setNeedLazyLoad];
}
export default useLazyLoad;
