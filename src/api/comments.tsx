import axios from 'axios';
import { BASE_URL } from '../constants';
import { Comment } from '../types/Comment';
import { OrderBy, OrderDir } from '../types/Order';

const CommentsBaseUrl = BASE_URL + '/comments';

type GetRes = {
  comments: Comment[],
  count: number,
};

export const getComments = async(
  parentId: string | null, 
  offsetCoef: number,
  countPerPage: number,
  order: [OrderBy, OrderDir],
): Promise<GetRes> => {
  const response = await axios.get(CommentsBaseUrl, { params: { 
    parentId, 
    offsetCoef, 
    countPerPage, 
    order 
  } });

  return response.data;
};

export const addComment = async(
  comment: Omit<Comment, 'id' | 'createdAt'>
): Promise<Comment> => {
  const response = await axios.post(CommentsBaseUrl, comment);

  return response.data;
};
