import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/GithubContext';

function Users() {
  const githubContext = useContext(GithubContext);
  const { users, loading } = githubContext;

  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div style={userStyle}>
      {users.map((item) => {
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
