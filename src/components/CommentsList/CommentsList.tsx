import { FC } from 'react';
import { Comment } from '../../types/Comment';
import { CommentItem } from "../CommentItem";

type Props = {
  comments: Comment[],
}

export const CommentsList: FC<Props> = ({ comments }) => {
  return (
    <div className="container">
      <div className='mt-4'>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}
