import React from 'react';
import classNames from '#utils/classNames';
import styles from './Table.module.scss';

export type TableItem<T = Record<string, any>> = T;

export interface TableColumn<T = Record<string, any>> {
  title?: string;
  dataIndex?: keyof T;
  width?: number;
  align?: React.TableHTMLAttributes<HTMLTableDataCellElement>['align'];
  render?: (
    value: T[keyof T] | undefined,
    item: T,
    itemIndex: number,
    items: T[],
  ) => React.ReactNode;
}

export interface TableProps<T = Record<string, any>> {
  items: TableItem<T>[];
  columns: TableColumn<T>[];
  rowKey?: (item: T, itemIndex: number) => React.Key;
  className?: React.TableHTMLAttributes<HTMLTableElement>['className'];
}

export default function Table<T = Record<string, any>>({
  items,
  columns,
  rowKey,
  className,
}: TableProps<T>) {
  return (
    <table className={classNames(styles.table, className)}>
      <colgroup>
        {columns.map((column, columnIndex) => {
          return <col key={`Col-${columnIndex}`} width={column.width} />;
        })}
      </colgroup>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {columns.map((column, columnIndex) => {
            return (
              <th
                className={styles.th}
                key={`Column-${columnIndex}`}
                align={column.align ?? 'left'}
              >
                {column.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {items.map((item, itemIndex) => {
          const key = rowKey ? rowKey(item, itemIndex) : itemIndex;
          return (
            <tr key={key} className={styles.tr}>
              {columns.map((column, columnIndex) => {
                const value = column.dataIndex && item[column.dataIndex];
                return (
                  <td
                    key={`${key}-Column-${columnIndex}`}
                    className={styles.td}
                    align={column.align ?? 'left'}
                  >
                    {column.render
                      ? column.render(value, item, itemIndex, items)
                      : (value as React.ReactNode)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
