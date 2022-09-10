import { ComponentType, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type WithPortalsProps<P extends object> = PropsWithChildren<P> & {
  portal?: string;
};

function withPortals<P extends object>(Component: ComponentType<P>, portalId?: string) {
  return function ComponentWithPortal(props: WithPortalsProps<P>) {
    const { portal, ...otherProps } = props;
    const target = document.getElementById(portal || portalId || 'portal');

    if (target === null) return <Component {...(otherProps as P)} />;
    return createPortal(<Component {...(otherProps as P)} />, target);
  };
}

export default withPortals;
