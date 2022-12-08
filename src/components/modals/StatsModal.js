
import { shareStatus } from '../../lib/share'
import { BaseModal } from './BaseModal'

const StatItem = ({
  label,
  value,
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-2xl font-bold">{value || 0}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}


export const StatsModal = ({
  isOpen,
  handleClose,
  score, 
  rows,
  remainder,
  stats,
  handleShare,
}) => {
  return (
    <BaseModal
      title={'Stats'}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex justify-center my-2">
        <StatItem label={'Score'} value={score} />
        <StatItem label={'Highest Game'} value={`${stats.highGame}`} />
        <StatItem label={'Lowest Game'} value={stats.lowGame} />
        <StatItem label={'Number Games'} value={stats.numberGames} />
      </div>
      <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent  px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            onClick={() => {
              shareStatus(score, rows, remainder)
              handleShare()
            }}
          >
            Share Score
          </button>
        </div>
    </BaseModal>
  )
}
