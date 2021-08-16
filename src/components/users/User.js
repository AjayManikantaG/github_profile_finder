import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repo from '../repos/Repo';

const User = (props) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
    props.getUserRepos(props.match.params.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    name,
    avatar_url,
    url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = props.user;
  console.log(name);

  const { loading } = props;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Home
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className='btn btn-dark my-1'
            target='_blank'
            rel='noreferrer'
          >
            Visit Github Profile
          </a>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public repos: {public_repos}</div>
        <div className='badge badge-dark'>Public gists: {public_gists}</div>
      </div>
      <div>
        <h3>My Top Repos</h3>
        <Repo repos={props.repos} />
      </div>
    </Fragment>
  );
};

export default User;
