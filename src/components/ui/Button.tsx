import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  locale?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  locale,
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[color:var(--golden)] to-[color:var(--golden-light)] text-white shadow',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm',
    outline: 'border-2 border-[color:var(--golden)] text-[color:var(--golden)] hover:bg-[color:var(--golden)] hover:text-white',
    text: 'text-[color:var(--golden)] hover:bg-gray-50',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-sm rounded-lg px-3 py-1.5',
    md: 'text-base rounded-xl px-5 py-2.5',
    lg: 'text-lg rounded-xl px-7 py-3',
    xl: 'text-xl rounded-2xl px-9 py-4',
  };

  // Icon positioning
  const iconClasses = icon 
    ? iconPosition === 'left' 
      ? 'flex items-center gap-2'
      : 'flex items-center flex-row-reverse gap-2'
    : '';

  // Combined styles
  const buttonStyles = `
    font-medium transition-all duration-300 hover-lift
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${iconClasses} 
    ${className}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
  `;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} locale={locale} className={buttonStyles} onClick={onClick}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;