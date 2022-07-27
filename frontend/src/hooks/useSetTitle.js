import { useEffect } from 'react';

export default function useSetTitle(title) {
  console.log(title);
  useEffect(() => {
    document.title = title;
  }, []);
}
