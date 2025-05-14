import React from 'react'
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react'

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.value
 * @param {React.ReactNode} props.icon
 * @param {string} props.change
 * @param {'up' | 'down' | 'neutral'} props.trend
 */
const StatsCard = (props) => {
  const { title, value, icon, change, trend } = props

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div className="flex items-center mt-4">
        {trend === 'up' && (
          <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
        )}
        {trend === 'down' && (
          <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
        )}
        {trend === 'neutral' && (
          <MinusIcon className="h-4 w-4 text-gray-500 mr-1" />
        )}
        <span
          className={`text-xs font-medium ${
            trend === 'up'
              ? 'text-green-500'
              : trend === 'down'
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  )
}

export default StatsCard
