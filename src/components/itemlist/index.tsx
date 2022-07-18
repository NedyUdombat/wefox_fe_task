import React from 'react';
import ItemCard from '../card';
import Spinner from 'react-bootstrap/Spinner';
import { useData } from '../../context/auth';

const ItemList = () => {
  const { responseData, loading } = useData();
  return (
    <div className="px-5 pb-5">
      {loading && <Spinner animation="grow" />}
      {responseData.length > 0 &&
        responseData.map((item) => <ItemCard key={item.id} item={item} />)}
    </div>
  );
};

export default ItemList;
