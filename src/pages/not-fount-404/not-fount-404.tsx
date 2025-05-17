import { FC } from 'react';
import styles from './not-fount-404.module.css';
import clsx from 'clsx';

export const NotFound404: FC = () => (
  <h3 className={clsx('pb-6', 'text', 'text_type_main-large', styles.text)}>
    Страница не найдена. Ошибка 404.
  </h3>
);
