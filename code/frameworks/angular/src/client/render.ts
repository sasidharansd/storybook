/* eslint-disable camelcase */
import type { Store_RenderContext, ArgsStoryFn } from '@storybook/types';

import { renderNgApp } from './angular/helpers';
import type { AngularFramework } from './types';

import { RendererFactory } from './angular-beta/RendererFactory';

export const rendererFactory = new RendererFactory();

export const render: ArgsStoryFn<AngularFramework> = (props) => ({ props });

export async function renderToDOM(
  {
    storyFn,
    showMain,
    forceRemount,
    storyContext: { parameters, component },
    id,
  }: Store_RenderContext<AngularFramework>,
  element: HTMLElement
) {
  showMain();

  if (parameters.angularLegacyRendering) {
    renderNgApp(storyFn, !forceRemount);
    return;
  }

  const renderer = await rendererFactory.getRendererInstance(id, element);

  await renderer.render({
    storyFnAngular: storyFn(),
    component,
    parameters,
    forced: !forceRemount,
    targetDOMNode: element,
  });
}
