import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    // Primary: McD Red background, White text, Yellow hover interaction
    primary: "bg-[#db0007] text-white hover:bg-[#b00006] shadow-md hover:shadow-lg border-2 border-transparent",
    
    // Secondary: McD Yellow background, Black text
    secondary: "bg-[#ffbc0d] text-[#292929] hover:bg-[#e0a60b] shadow-md",
    
    // Outline: Red border, Red text
    outline: "bg-transparent border-2 border-[#db0007] text-[#db0007] hover:bg-[#db0007] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};