import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '@src/services/store';
import { userLogin } from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(userLogin({ email, password })).unwrap();
    } catch (err) {
      const message = (err as { message: string }).message;
      const messageMap: Record<string, string> = {
        'email or password are incorrect': 'Неверный логин или пароль'
      };

      setError(messageMap[message] ?? 'Неизвестная ошибка');
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
