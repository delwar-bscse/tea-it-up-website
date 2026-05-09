import { useState } from 'react';

const useLoginUser = () => {

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return {
    isLogin,
    login,
    logout,
  };
};

export default useLoginUser;