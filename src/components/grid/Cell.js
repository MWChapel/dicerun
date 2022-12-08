import classnames from 'classnames'

export const Cell = ({ value, status, column }) => {
  let width = 'w-6';
  if(column === 10 || column === 11) {
    width = 'w-11';
  } else if (column > 0 && column < 10) {
    width = 'w-6';
  }
  const classes = classnames(
    `${width} h-6 flex items-center justify-center mx-0.5 text-xs font-bold rounded dark:text-white`,
    {
      'border-solid border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-solid border-2 border-black dark:border-slate-100': status !== 'good' && status !== 'multiple' && (column === 0 || column === 10 || column === 11 || status === 'fifth'),
      'border-solid border-2 bg-red-400 dark:bg-red-700 text-white border-red-400 dark:border-red-700':
        status === 'bad' || status === 'end',
      'border-solid border-2 bg-green-500 text-white border-green-500 dark:border-green-500': status === 'good',
      'border-solid border-2 bg-blue-500 text-white border-blue-500 dark:border-blue-500': status === 'extra',
      'border-solid border-2 border-green-500 dark:border-green-500': status === 'multiple',
      'border-solid border-2 bg-yellow-500 border-yellow-500 dark:border-yellow-500': status === 'closed',
      'border-solid border-2 bg-yellow-600 dark:bg-yellow-600 text-white border-yellow-600 dark:border-yellow-600':
        status === 'zero',
      '': status === 'clear',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
