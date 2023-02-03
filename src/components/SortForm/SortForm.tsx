import { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { OrderBy, OrderDir } from '../../types/Order';

type Props = {
  orderBy: OrderBy,
  onChangeOrder: Dispatch<SetStateAction<OrderBy>>,
  dir: OrderDir,
  onChangeDir: Dispatch<SetStateAction<OrderDir>>,
};

export const SortForm: FC<Props> = ({ 
  orderBy, 
  onChangeOrder, 
  dir, 
  onChangeDir 
}) => {
  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let typifiedValue;

    switch (e.target.value) {
      case OrderBy.date:
        typifiedValue = OrderBy.date;
        
        break;
      case OrderBy.name:
        typifiedValue = OrderBy.name;

        break;
      case OrderBy.email:
        typifiedValue = OrderBy.email;

        break;
      default:
        return;
    }

    onChangeOrder(typifiedValue);
  };

  const handleDirChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let typifiedValue;

    switch (e.target.value) {
      case OrderDir.acs:
        typifiedValue = OrderDir.acs;
        
        break;
      case OrderDir.desc:
        typifiedValue = OrderDir.desc;

        break;
      default:
        return;
    }

    onChangeDir(typifiedValue);
  };

  return (
    <div>
      <label>
        Sort by:
        <select value={orderBy} onChange={handleOrderChange}>
          <option value={OrderBy.date}>Created date</option>
          <option value={OrderBy.name}>User name</option>
          <option value={OrderBy.email}>User email</option>
        </select>
      </label>
      
      <label>
        Sort direction:
        <select value={dir} onChange={handleDirChange}>
          <option value={OrderDir.acs}>ASC</option>
          <option value={OrderDir.desc}>DESC</option>
        </select>
      </label>
    </div>
  );
};
