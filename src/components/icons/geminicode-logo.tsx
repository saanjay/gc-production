
interface GeminiCodeLogoProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export function GeminiCodeLogo({ className = '', size = 32, onClick }: GeminiCodeLogoProps) {
  return (
    <div 
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      {/* Curly Braces */}
      <div className="flex items-center">
        <span 
          className="text-blue-600 dark:text-blue-400 font-bold"
          style={{ fontSize: `${size * 0.8}px` }}
        >
          {'{'}
        </span>
        <span 
          className="text-blue-600 dark:text-blue-400 font-bold"
          style={{ fontSize: `${size * 0.8}px` }}
        >
          {'}'}
        </span>
      </div>
      
      {/* Text */}
      <div className="flex items-baseline">
        <span 
          className="text-blue-600 dark:text-blue-400 font-bold"
          style={{ fontSize: `${size * 0.5}px` }}
        >
          GeminiCode
        </span>
        <span 
          className="text-blue-500 dark:text-blue-300 font-bold ml-0.5"
          style={{ fontSize: `${size * 0.5}px` }}
        >
          .ai
        </span>
      </div>
    </div>
  );
}
