import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

function Users(props) {
  if (props.loading === true) {
    return <Spinner />;
  }

  return (
    <div style={userStyle}>
      {props.users.map((item) => {
        return <UserItem key={item.id} users={item} />;
      })}
    </div>
  );
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
