import React from 'react';
import { render } from '../../test-utils';
import Dog from './index';

test('renders learn react link', () => {
  const { getByText } = render(<Dog />);

  expect(getByText(/Matched Breed/i)).toBeInTheDocument();
});
