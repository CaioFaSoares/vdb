import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useClick,
  useFocus,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';

const Tooltip = ({
  children,
  className = 'inline',
  size = 'md',
  overlay,
  noPadding,
  placement = 'right',
}) => {
  // TODO customize width (maybe less steps/variants is OK?)
  const widthClass = {
    sm: 'max-w-full sm:max-w-[65%] md:max-w-[50%] lg:max-w-[45%] xl:max-w-[35%] 2xl:max-w-[25%]',
    md: 'max-w-full sm:max-w-[80%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[45%] 2xl:max-w-[40%]',
    lg: 'max-w-full sm:max-w-[80%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[55%]',
    xl: 'max-w-full sm:max-w-[80%] md:max-w-[95%] lg:max-w-[85%] xl:max-w-[75%] 2xl:max-w-[70%]',
  };

  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const {
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement: arrowPlacement,
    x,
    y,
    reference,
    floating,
    strategy,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(7), flip(), shift(), arrow({ element: arrowRef })],
  });

  const click = useClick(context);
  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    focus,
    dismiss,
  ]);

  const arrowOffset = {
    bottom: 'top-[-7px]',
    left: 'right-[-7px]',
    right: 'left-[-7px]',
    top: 'bottom-[-7px]',
  }[arrowPlacement.split('-')[0]];

  const arrowRotate = {
    bottom: 'rotate-[135deg]',
    left: 'rotate-[225deg]',
    right: 'rotate-[45deg]',
    top: 'rotate-[315deg]',
  }[arrowPlacement.split('-')[0]];

  return (
    <>
      <div className={className} ref={reference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            className={`z-50 rounded-md border border-bgSecondary bg-bgPrimary text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark ${
              noPadding ? '' : 'p-3'
            } ${widthClass[size]}
`}
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {overlay}
            <div
              ref={arrowRef}
              className={`absolute z-[-1] h-[12px] w-[12px] border-l border-b border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark ${arrowOffset} ${arrowRotate}`}
              style={{
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
