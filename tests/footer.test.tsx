import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, test, expect } from 'vitest'
import Footer from '../src/Components/html/Footer';

describe('<Navbar />', () => {
    test('renders the navbar', () => {
        const warper = render(<Footer />);
        expect(warper).toBeTruthy();
    });
});

