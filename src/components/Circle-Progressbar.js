import React from "react";

const CircularProgressBar = ({ percentage, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Длина окружности
  const offset = circumference - (percentage / 100) * circumference; // Смещение для прогресса

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Фон кольца */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="none"
        style={{
          transition: "stroke-dashoffset 0.3s",
          filter: "drop-shadow(0 0 10px white))", // Свечение
        }}
      />
      {/* Прогресс кольца */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#00bcd4"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      {/* Текст в центре */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="20px"
        fill="#00bcd4"
      >
        75%
      </text>
    </svg>
  );
};

export {CircularProgressBar};
