import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '@src/services/store';
import { userRegister } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        userRegister({
          name: userName,
          email,
          password
        })
      ).unwrap();
    } catch (err) {
      const message = (err as { message: string }).message;
      const messageMap: Record<string, string> = {};

      setError(messageMap[message] ?? 'Неизвестная ошибка');
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
