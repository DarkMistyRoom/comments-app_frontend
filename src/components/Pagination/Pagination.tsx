import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  count: number,
  page: number,
  setPage: (value: number) => void,
};

export const Pagination: FC<Props> = ({ count, page, setPage }) => {
  const countArr = [];

  for (let i = 1; i <= count; i++) {
    countArr[i] = i;
  }

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <button className='btn' onClick={handlePrev}>{'<'}</button>
      {countArr.map(number => (
        <button 
          key={number}
          className={classNames('btn', { active: page === number})}
          onClick={() => setPage(number)}
        >
          {number}
        </button>
      ))}
      <button className='btn' onClick={handleNext}>{'>'}</button>
    </div>
  );
};
