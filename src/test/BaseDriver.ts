import { within } from '@testing-library/react';

export class BaseDriver {
  protected readonly queries = within(this.element);

  constructor(private readonly element: HTMLElement) {}
}
