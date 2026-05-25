import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';

// Mock the Medusa SDK
jest.mock('../../lib/medusa', () => ({
  sdk: {
    store: {
      product: {
        list: jest.fn(),
      },
    },
  },
}));

import { sdk } from '../../lib/medusa';

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders products when fetched successfully', async () => {
    const mockProducts = [
      {
        id: '1',
        title: 'Test Honey 1',
        handle: 'test-honey-1',
        thumbnail: 'http://example.com/test1.jpg',
        variants: [{ prices: [{ amount: '10.00' }] }],
        categories: [{ name: 'Category 1' }],
      },
      {
        id: '2',
        title: 'Test Honey 2',
        handle: 'test-honey-2',
        thumbnail: 'http://example.com/test2.jpg',
        variants: [{ prices: [{ amount: '20.00' }] }],
        categories: [{ name: 'Category 2' }],
      },
    ];

    (sdk.store.product.list as jest.Mock).mockResolvedValue({ products: mockProducts });

    const Page = await Home();
    render(Page);

    await waitFor(() => {
      expect(screen.getByText('Test Honey 1')).toBeInTheDocument();
      expect(screen.getByText('Test Honey 2')).toBeInTheDocument();
    });
  });

  it('renders empty state when fetch fails', async () => {
    // Mock console.error to prevent output pollution during expected error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    (sdk.store.product.list as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const Page = await Home();
    render(Page);

    await waitFor(() => {
      expect(screen.getByText(/No products found/i)).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch products from Medusa backend:", expect.any(Error));
    consoleSpy.mockRestore();
  });
});
