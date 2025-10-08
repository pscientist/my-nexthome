import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Add from '../add';

describe('Add listing form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new house when the form is submitted', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const asyncStorageMock = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

    asyncStorageMock.getItem.mockResolvedValueOnce(null);

    const { getByPlaceholderText, getByText } = render(<Add />);

    fireEvent.changeText(
      getByPlaceholderText('e.g. Charming Loft in Downtown'),
      'Cozy Cabin'
    );
    fireEvent.changeText(getByPlaceholderText('e.g. 42 Maple Street'), '123 Main St');
    fireEvent.changeText(
      getByPlaceholderText('e.g. $1,800 - $2,200'),
      '$2,000 - $2,200'
    );
    fireEvent.changeText(getByPlaceholderText('e.g. 3'), '4');
    fireEvent.changeText(
      getByPlaceholderText('Add viewing notes, highlights, or questions'),
      'Schedule viewing on Friday'
    );

    fireEvent.press(getByText('Save Listing'));

    await waitFor(() => {
      expect(asyncStorageMock.setItem).toHaveBeenCalledTimes(1);
    });

    const [, payload] = asyncStorageMock.setItem.mock.calls[0];
    const storedListings = JSON.parse(payload);

    expect(asyncStorageMock.setItem).toHaveBeenCalledWith(
      '@househunt_listings',
      expect.any(String)
    );
    expect(Array.isArray(storedListings)).toBe(true);
    expect(storedListings).toHaveLength(1);

    const savedListing = storedListings[0];
    expect(savedListing).toEqual(
      expect.objectContaining({
        title: 'Cozy Cabin',
        location: '123 Main St',
        priceRange: '$2,000 - $2,200',
        rooms: '4',
        notes: 'Schedule viewing on Friday',
        synced: false,
      })
    );
    expect(typeof savedListing.id).toBe('string');
    expect(typeof savedListing.createdAt).toBe('string');
    expect(typeof savedListing.updatedAt).toBe('string');

    expect(alertSpy).toHaveBeenCalledWith(
      'Success',
      'Listing saved locally! It will be synced to the server later.',
      [{ text: 'OK' }]
    );

    alertSpy.mockRestore();
  });
});
