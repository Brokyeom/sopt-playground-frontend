import styled from '@emotion/styled';
import { createContext, FC, ReactNode, useRef, useState } from 'react';
import { useEffect } from 'react';

import { ToastStatus } from '@/components/projects/upload/ToastProvider/types';
import { colors } from '@/styles/colors';
import { TimeoutID } from '@/types';

export const ToastContext = createContext<{ showToast: (message: string) => void }>({
  showToast() {
    // do nothing
  },
});

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

export const ToastProvider: FC<ToastProviderProps> = ({ duration = 1000, children }) => {
  const [toast, setToast] = useState<ToastStatus>({ isActive: false, message: '' });
  const timeoutID = useRef<TimeoutID | undefined>();
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out'>('slide-in');

  const showToast = (message: string) => {
    if (timeoutID.current) return;
    setToast({ isActive: true, message });
    timeoutID.current = setTimeout(() => hideToast(), (duration ?? 1000) + 600);
  };
  const hideToast = () => {
    setToast({ isActive: false, message: '' });
    timeoutID.current && clearTimeout(timeoutID.current);
    timeoutID.current = undefined;
  };

  useEffect(() => {
    let animationTimeout: TimeoutID;
    if (toast.isActive) {
      animationTimeout = setTimeout(() => {
        setAnimation('slide-out');
        clearTimeout(animationTimeout);
      }, duration);
    } else {
      setAnimation('slide-in');
    }
    return () => clearTimeout(animationTimeout);
  }, [duration, toast, animation]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <StyledContainer>
        {toast.isActive && <StyledToastItem animation={animation}>{toast.message}</StyledToastItem>}
      </StyledContainer>
    </ToastContext.Provider>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const StyledToastItem = styled.div<{ animation: string }>`
  position: sticky;
  bottom: 71px;
  left: 36px;
  margin: 20px 14px;
  border-radius: 8px;
  background: #fff;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 24px;
  width: 343px;
  animation: 0.3s forwards ${(props) => props.animation};
  line-height: 136%;
  color: black;
  color: ${colors.gray80};
  font-size: 16px;
  font-weight: 500;

  @keyframes slide-in {
    from {
      transform: translateY(300%);
    }

    to {
      transform: translateY(0%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0%);
    }

    to {
      transform: translateY(300%);
    }
  }
`;
