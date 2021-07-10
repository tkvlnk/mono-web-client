import cx from 'classnames';
import React, { HTMLProps } from 'react';

import s from './Card.module.scss';

export function Card(
  props: React.PropsWithChildren<HTMLProps<HTMLDivElement>>
) {
  const { children, className, ...restProps } = props;

  return (
    <div className={cx(s.root, className)} {...restProps}>
      {children}
    </div>
  );
}
