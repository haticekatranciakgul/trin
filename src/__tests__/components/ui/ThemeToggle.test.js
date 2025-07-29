import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../../components/ui/ThemeToggle';
import { ThemeContext } from '../../../theme/ThemeContext';

// Context mock'u ile render fonksiyonu
const renderWithTheme = (ui, { isDarkMode = false, toggleTheme = jest.fn() } = {}) => {
  return render(
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {ui}
    </ThemeContext.Provider>
  );
};

describe('ThemeToggle', () => {
  it('bileşen render oluyor', () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('butona tıklanınca toggleTheme fonksiyonu çağrılır', () => {
    const toggleTheme = jest.fn();
    renderWithTheme(<ThemeToggle />, { toggleTheme });
    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('butonun aria-label özelliği doğru', () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'toggle theme');
  });

  it('koyu modda light-icon gösterilir', () => {
    renderWithTheme(<ThemeToggle />, { isDarkMode: true });
    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
  });

  it('açık modda dark-icon gösterilir', () => {
    renderWithTheme(<ThemeToggle />, { isDarkMode: false });
    expect(screen.getByTestId('dark-icon')).toBeInTheDocument();
  });

  it('tooltip koyu modda doğru', async () => {
    renderWithTheme(<ThemeToggle />, { isDarkMode: true });
    fireEvent.mouseOver(screen.getByRole('button'));
    expect(await screen.findByText('Switch to Light Mode')).toBeInTheDocument();
  });

  it('tooltip açık modda doğru', async () => {
    renderWithTheme(<ThemeToggle />, { isDarkMode: false });
    fireEvent.mouseOver(screen.getByRole('button'));
    expect(await screen.findByText('Switch to Dark Mode')).toBeInTheDocument();
  });
}); 