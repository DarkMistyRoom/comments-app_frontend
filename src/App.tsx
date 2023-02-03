import { useState, useEffect } from 'react';
import { addComment, getComments } from './api/comments';
import { CommentForm } from './components/CommentForm';
import { CommentsList } from "./components/CommentsList";
import { Pagination } from './components/Pagination';
import { SortForm } from './components/SortForm';
import { COUNT_PER_PAGE } from './constants';
import { Comment, CommentsState } from './types/Comment';
import { OrderBy, OrderDir } from './types/Order';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.date);
  const [orderDir, setOrderDir] = useState<OrderDir>(OrderDir.desc);
  const [pageCount, setPageCount] = useState(1);

  const [
    rootComments,
    setRootComments
  ] = useState<CommentsState>({ [page]: [] });

  const fetchComments = async() => {
    const { comments: fetchedComments, count: fetchedCount } =
      await getComments(null, page, COUNT_PER_PAGE, [orderBy, orderDir]);

    setPageCount(Math.ceil(fetchedCount / COUNT_PER_PAGE));

    return fetchedComments;
  };

  useEffect(() => {
    (async function() {
      setPage(1);

      const fetchedComments = await fetchComments();
      
      setRootComments({ [page]: fetchedComments });
      setIsLoading(false);
    })();
  }, [orderBy, orderDir]);

  useEffect(() => {
    (async function() {
      if (page in rootComments) {
        return;
      }

      const fetchedComments = await fetchComments();
      
      setRootComments({ 
        ...rootComments,
          [page]: fetchedComments,
      });

      setIsLoading(false);
    })();
  }, [page]);

  const handlePageChange = (value: number) => {
    if (!(value in rootComments)) {
      setIsLoading(true);
    }

    setPage(value);
  };

  const addNewComment = async(
    newCommentOptions: Omit<Comment, 'id' | 'createdAt'>
  ) => {
    setIsLoading(true);

    const newComment = await addComment(newCommentOptions);
    const stateCopy = {...rootComments};
    
    stateCopy[1].unshift(newComment);
    console.log(rootComments[1].length);

    if (rootComments[1].length >= COUNT_PER_PAGE) {
      for (const pageNo in stateCopy) {
        const lastItem = stateCopy[pageNo].pop();

        if (lastItem && +pageNo + 1 in rootComments) {
          stateCopy[+pageNo + 1].unshift(lastItem);
        }
      }
    }

    setRootComments(stateCopy);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <CommentForm parentId={null} handleSubmit={addNewComment} />

      <SortForm 
        orderBy={orderBy} 
        onChangeOrder={setOrderBy} 
        dir={orderDir} 
        onChangeDir={setOrderDir} 
      />

      {isLoading || <>
        <CommentsList comments={rootComments[page]} />
        {pageCount > 1 && 
          <Pagination
            count={pageCount} 
            page={page} 
            setPage={handlePageChange} 
          />
        }
      </>}
    </div>
  );
}

export default App;
