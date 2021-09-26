import React from 'react';
import { useHistory } from 'react-router';
import { useStore } from '@/stores';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const userStore = useStore('user');
  const onLogin = () => {
    userStore.setInfo({
      nickname: 'nickname'
    });
    history.push('/foo');
  };

  return (
    <div>
      <button onClick={onLogin}>登录</button>
    </div>
  );
};

export default LoginPage;