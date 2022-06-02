import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('Testing Login', () => {
    render(<Login />);    
    it('checks for the email textbox', () => {
    const textbox = screen.getByRole('textbox');        
    const emailTextbox = textbox;    
    const submitButton = screen.getByRole('button', {name: 'Log In'});
    fireEvent.change(emailTextbox, {target: {value:'actest456@gmail.com'}});    
    expect(textbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    });    
});