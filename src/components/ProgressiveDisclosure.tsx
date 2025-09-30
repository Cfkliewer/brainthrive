"use client"
import { useState } from "react";

interface DisclosureLevel {
  title: string;
  content: string;
  level: 1 | 2 | 3;
  audienceLabel: string;
}

interface ProgressiveDisclosureProps {
  levels: DisclosureLevel[];
  defaultLevel?: 1 | 2 | 3;
  className?: string;
}

export default function ProgressiveDisclosure({
  levels,
  defaultLevel = 1,
  className = ""
}: ProgressiveDisclosureProps) {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(defaultLevel);

  const currentContent = levels.find(level => level.level === currentLevel);

  const getLevelTheme = (level: 1 | 2 | 3) => {
    switch(level) {
      case 1:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          active: currentLevel === 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        };
      case 2:
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-800",
          active: currentLevel === 2 ? "bg-purple-600 text-white" : "bg-white text-purple-600"
        };
      case 3:
        return {
          bg: "bg-teal-50",
          border: "border-teal-200",
          text: "text-teal-800",
          active: currentLevel === 3 ? "bg-teal-600 text-white" : "bg-white text-teal-600"
        };
    }
  };

  return (
    <div className={`progressive-disclosure ${className}`}>
      {/* Level Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {levels.map((level) => {
          const theme = getLevelTheme(level.level);
          return (
            <button
              key={level.level}
              onClick={() => setCurrentLevel(level.level)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 medical-focus ${theme.active} ${
                currentLevel === level.level
                  ? `border-${level.level === 1 ? 'blue' : level.level === 2 ? 'purple' : 'teal'}-600`
                  : `border-${level.level === 1 ? 'blue' : level.level === 2 ? 'purple' : 'teal'}-200`
              }`}
              aria-label={`Switch to ${level.audienceLabel} level information`}
            >
              {level.audienceLabel}
            </button>
          );
        })}
      </div>

      {/* Content Display */}
      {currentContent && (
        <div className={`transition-all duration-300 ease-in-out`}>
          <div className={`p-4 rounded-lg border ${getLevelTheme(currentLevel).bg} ${getLevelTheme(currentLevel).border}`}>
            <h4 className={`font-semibold mb-3 ${getLevelTheme(currentLevel).text}`}>
              {currentContent.title}
            </h4>
            <div
              className={`prose prose-sm max-w-none ${getLevelTheme(currentLevel).text}`}
              dangerouslySetInnerHTML={{ __html: currentContent.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
}