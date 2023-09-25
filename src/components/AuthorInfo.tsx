import React from 'react';
import { useRecoilValue } from 'recoil';
import { userNameSelector } from '../login/atoms';

interface AuthorInfoProps {
  postAuthor: string; // 작성자의 이름
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ postAuthor }) => {
  const loggedInUser = useRecoilValue(userNameSelector);

  return (
    <div>
      {loggedInUser === postAuthor ? (
        <p>You are the author of this post.</p>
      ) : (
        <p>Written by: {postAuthor}</p>
      )}
    </div>
  );
};

export default AuthorInfo;
