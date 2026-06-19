import { preventFocusScroll } from './prevent-focus-scroll';

describe('preventFocusScroll', () => {
  it('calls preventDefault on the event', () => {
    const event = { preventDefault: jest.fn() } as unknown as React.MouseEvent;
    preventFocusScroll(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
