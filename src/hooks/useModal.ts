import { useState } from 'react';

export interface UseModalProps {
  initialValue?: boolean;
  onShow?: (...args: any) => void;
  onHide?: () => void;
}

export const useModal = ({
  initialValue = false,
  onShow,
  onHide,
}: UseModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialValue);
  const show = (...args: any) => {
    setIsVisible(true);
    if (onShow) onShow(args);
  };
  const hide = () => {
    setIsVisible(false);
    if (onHide) onHide();
  };
  return {
    visible: isVisible,
    show,
    hide,
  };
};
