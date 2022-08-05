import { useEffect, useState } from 'react';
import { postApi } from '../api';

export default function useGetPostDetail(idPost, isComment) {
  const [postById, setPostById] = useState([]);
  const [listPosted, setListPosted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { posted, comments } = await postApi.getPostById(idPost);

        const { newList, follows } = await postApi.getPostAll(
          posted.user.userName
        );
        setListPosted({ newList, follows });

        setPostById({ posted, comments });
      } catch (error) {
        console.log('Failed to fetch product', error);
      }

      setLoading(false);
    })();
  }, [idPost, isComment]);

  return {
    postById,
    listPosted,
    loading,
  };
}