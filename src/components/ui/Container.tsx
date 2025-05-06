import { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  fluid?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Container = ({
  children,
  className = '',
  as: Component = 'div',
  fluid = false,
  maxWidth = '2xl',
}: ContainerProps) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    'full': 'max-w-full',
  };

  return (
    <Component
      className={`${
        fluid ? 'px-4 sm:px-6 lg:px-8' : `mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`
      } ${className}`}
    >
      {children}
    </Component>
  );
};

export default Container;   