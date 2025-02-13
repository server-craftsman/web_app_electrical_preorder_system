// src/components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  isIncrease: boolean;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  change,
  isIncrease,
  bgColor,
  textColor,
}) => (
  <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-5">
    <div className={`p-3 rounded-xl ${bgColor}`}>{icon}</div>
    <div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-gray-500">{label}</p>
      <span className={`text-sm font-medium ${textColor}`}>
        {isIncrease ? '▲' : '▼'} {change} tuần này
      </span>
    </div>
  </div>
);

export default StatCard;
