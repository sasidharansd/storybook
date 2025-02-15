import { Context, createContext } from 'react';
import { window as globalWindow } from 'global';

import type { DocsContextProps } from '@storybook/preview-web';
import type { AnyFramework } from '@storybook/types';

export type { DocsContextProps };

// We add DocsContext to window. The reason is that in case DocsContext.ts is
// imported multiple times (maybe once directly, and another time from a minified bundle)
// we will have multiple DocsContext definitions - leading to lost context in
// the React component tree.
// This was specifically a problem with the Vite builder.
/* eslint-disable no-underscore-dangle */
if (globalWindow && globalWindow.__DOCS_CONTEXT__ === undefined) {
  globalWindow.__DOCS_CONTEXT__ = createContext(null);
  globalWindow.__DOCS_CONTEXT__.displayName = 'DocsContext';
}

export const DocsContext: Context<DocsContextProps<AnyFramework>> = globalWindow
  ? globalWindow.__DOCS_CONTEXT__
  : createContext(null);
