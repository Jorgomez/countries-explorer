// Test for StateDisplay component using Jest and Testing Library 
import React from 'react';
import { render } from '@testing-library/react-native';
import StateDisplay from '../../src/components/StateDisplay/StateDisplay';


jest.mock('../../src/hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.retry': 'Try Again',
        'common.noResults': 'No results found',
      };
      return translations[key] || key;
    },
  }),
}));

describe('StateDisplay Component', () => {
  it('should render loading state', () => {
    const { getByText } = render(<StateDisplay type="loading" />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should render error state', () => {
    const { getByText } = render(<StateDisplay type="error" />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('should render empty state', () => {
    const { getByText } = render(<StateDisplay type="empty" />);
    expect(getByText('No results found')).toBeTruthy();
  });
});
