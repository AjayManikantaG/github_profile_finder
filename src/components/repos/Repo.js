import React, { Fragment } from 'react';
import RepoItem from './RepoItem';

const Repo = ({ repos }) => {
  return repos.map((repo) => {
    return <RepoItem repo={repo} key={repo.id} />;
  });
};

export default Repo;
