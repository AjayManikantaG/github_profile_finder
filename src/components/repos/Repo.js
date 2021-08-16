import React, { Fragment } from 'react';
import RepoItem from './RepoItem';

const Repo = ({ repos }) => {
  return repos.map((repo) => {
    return (
      <Fragment>
        <RepoItem repo={repo} key={repo.id} />
      </Fragment>
    );
  });
};

export default Repo;
