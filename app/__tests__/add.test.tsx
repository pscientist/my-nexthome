import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import Add from '../addeditform';


describe('Add listing form', () => {
    it('submits a new house when fields are filled', async () => {
        const { getByPlaceholderText, getByText } = render(<Add />);

        // Fill inputs by placeholder (matches your component’s placeholders)
        fireEvent.changeText(
            getByPlaceholderText('e.g. Charming Loft in Downtown'),
            'Sunny 3BR near Domain'
        );
        fireEvent.changeText(getByPlaceholderText('e.g. 42 Maple Street'), '12 Queen St, Auckland');
        fireEvent.changeText(getByPlaceholderText('e.g. $1,800 - $2,200'), '$850k - $900k');
        fireEvent.changeText(getByPlaceholderText('e.g. 3'), '3');
        fireEvent.changeText(
            getByPlaceholderText('Add viewing notes, highlights, or questions'),
            'North-facing, great light'
        );

        // Submit
        fireEvent.press(getByText('Save Listing'));

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalled();
        });
    });
});
