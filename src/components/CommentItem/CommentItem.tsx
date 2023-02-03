import { FC, useEffect, useState } from 'react';
import { addComment, getComments } from '../../api/comments';
import { COUNT_PER_PAGE } from '../../constants';
import { Comment } from "../../types/Comment";
import { OrderBy, OrderDir } from '../../types/Order';
import { CommentForm } from '../CommentForm';
import { CommentsList } from '../CommentsList';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

type Props = {
  comment: Comment,
};

export const CommentItem: FC<Props> = ({ comment }) => {
  const { 
    id, 
    body, 
    userName, 
    homePage, 
    createdAt 
  } = comment;

  const [isLoading, setIsLoading] = useState(true);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [areRepliesHidden, setAreRepliesHidden] = useState(true);

  let offset = 1;
  let count = 0;

  const loadMoreReplies = async() => {
    const { comments: fetchedReplies, count: fetchedCount } = await getComments(
      id, 
      offset, 
      COUNT_PER_PAGE, 
      [OrderBy.date, OrderDir.acs]
    );

    count = fetchedCount;
    setReplies([...replies, ...fetchedReplies]);
  };

  const handleShowReplies = () => {
    setAreRepliesHidden(false);
  };

  const handleShowMore = async () => {
    setIsLoading(true);
    offset++;
    await loadMoreReplies();
    setIsLoading(false);
  };
  
  const addNewReply = async(
    newCommentOptions: Omit<Comment, 'id' | 'createdAt'>
  ) => {
    setIsLoading(true);

    const newReply = await addComment(newCommentOptions);

    setIsFormVisible(false);
    
    if (replies.length === count) {
      setReplies([...replies, newReply]);
      count++;
    }
  };

  useEffect(() => {
    (async function() {
      await loadMoreReplies();
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='comment-stack'>
      <div className='comment'>
        <div className='header'>
          <a href={homePage ? homePage : '#'}>
            <span className='name'>{userName}</span>
          </a>
          <span className='date'>
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>

        <div className='message'>{body}</div>
        <div className='footer'>
          <button className='btn' onClick={() => setIsFormVisible(true)}>
            Reply
          </button>

          {isFormVisible && 
            <CommentForm parentId={id} handleSubmit={addNewReply} />
          }

          {!isLoading && replies.length > 0 && areRepliesHidden && 
            <button 
              className='btn' 
              onClick={handleShowReplies}
            >
              Show replies
            </button>
          }
        </div>
      </div>

      {areRepliesHidden || (
        <>
          <div className='nested-comments-stack'>
            <button className='collapse-line' aria-label='Hide Replies' />
            <div className='nested-comments'>
              <CommentsList comments={replies} />
              {replies.length < count && 
                <button onClick={handleShowMore}>Show more</button>
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}
