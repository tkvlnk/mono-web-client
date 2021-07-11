import cx from 'classnames';
import dayjs from 'dayjs';
import dayJsLocale from 'dayjs/locale/uk';
import React from 'react';

import { CurrenciesKit } from '../../api/CurrenciesKit';
import { StatementItem } from '../../api/types';

import { findVisualsByMcc } from '../../mccData/findVisualsByMcc';

import { Card } from '../Card/Card';

import s from './StatementRow.module.scss';

interface StatementRowProps {
  statement: StatementItem;
  onSelection: (isSelected: boolean) => void;
  isSelected?: boolean;
}

export function StatementRow(props: StatementRowProps) {
  const { statement, onSelection, isSelected } = props;

  const timestamp = statement.time * 1000;

  const datetime = dayjs(timestamp).locale(dayJsLocale);

  const mccVisuals = findVisualsByMcc(statement.mcc);

  return (
    <Card
      className={cx(s.root, {
        [s._selected]: !isSelected,
        [s._income]: statement.amount > 0
      })}
    >
      <input
        className={s.checkbox}
        type="checkbox"
        checked={isSelected}
        onChange={(event) => onSelection(event.target.checked)}
      />

      <div>
        <div>{datetime.format('D MMM. YYYY')}</div>
        <div>{datetime.format('HH:mm')}</div>
      </div>

      <div className={s.info}>
        <div className={s.emoji}>{mccVisuals.emoji} </div>
        <div>
          <div className={s.label}>{mccVisuals.label}</div>
          <div className={s.comment}>{statement.description}</div>
        </div>
      </div>

      <div className={s.numbers}>
        <div className={s.amount}>
          {(statement.amount / 100).toLocaleString('uk')}
        </div>
        <div className={s.balance}>
          {CurrenciesKit[statement.currencyCode].symbol}
          {(statement.balance / 100).toLocaleString('uk')}
        </div>
      </div>
    </Card>
  );
}

StatementRow.defaultProps = {
  isSelected: false
};
