import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PhotoForm from './PhotoForm';

const mockOnPhotoUploaded = jest.fn();

test('handles form submission', async () => {
  // Mock Axios
  const mockAxios = new MockAdapter(axios);

  // Mock successful response
  mockAxios.onPost('http://localhost:8000/photos/upload/').reply(200, {
    title: 'Test Photo',
    description: 'Test Description',
    latitude: 10,
    longitude: 20,
    file_path: 'example.png'
  });

  render(<PhotoForm onPhotoUploaded={mockOnPhotoUploaded} />);

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Photo' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByLabelText(/Latitude/i), { target: { value: '10' } });
  fireEvent.change(screen.getByLabelText(/Longitude/i), { target: { value: '20' } });

  // Create a fake file
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
  fireEvent.change(screen.getByLabelText(/Upload File/i), { target: { files: [file] } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Upload Photo/i }));

  // Wait for async operation to complete
  await screen.findByText(/Photo uploaded successfully!/);

  // Check if the mock function was called
  expect(mockOnPhotoUploaded).toHaveBeenCalled();

  // Clean up
  mockAxios.restore();
});