import { act, fireEvent, getByText, render, waitFor } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
	beforeEach(() => {
		(fetch as FetchMock).resetMocks();
	});
	it('adds an Item after Create', async () => {
		const taskInitialFetchResponse = {
			data: [],
			status: 'ok',
		};

		const taskPostResponse = {
			data: {
				name: 'Task Test 1 Test',
				description: 'Beschreibung Test 1 Test',
				created: new Date('2019-01-01'),
				updated: new Date('2019-01-01'),
				labels: [],
				trackings: [],
			},
			status: 'ok',
		};

		const taskResponse = {
			data: [
				{
					name: 'Task Test 2 Test',
					description: 'Beschreibung Test 2 Test',
					created: new Date('2019-01-01'),
					updated: new Date('2019-01-01'),
					labels: [],
					trackings: [],
				},
			],
			status: 'ok',
		};
		(fetch as FetchMock)
			.once(JSON.stringify(taskInitialFetchResponse))
			.once(JSON.stringify(taskPostResponse))
			.once(JSON.stringify(taskResponse));
		const { getByLabelText: getByLabelTextContainer, getByTestId, findAllByTestId } = render(
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<DashboardPage />
				</BrowserRouter>
			</ThemeProvider>,
		);

		const createTask = getByTestId('add-task-button');

		await act(async () => {
			fireEvent.click(createTask);
		});
		await waitFor(() => {
			expect(getByTestId('add-task-form')).toBeInTheDocument();
		});
		const taskForm = getByTestId('add-task-form');

		const name = getByLabelTextContainer(/name/i);
		const description = getByLabelTextContainer(/description/i);

		fireEvent.change(name, {
			target: { value: taskResponse.data[0].name },
		});
		fireEvent.change(description, {
			target: { value: taskResponse.data[0].description },
		});

		const submit = getByText(taskForm, /Add Task/i);
		fireEvent.click(submit);

		await findAllByTestId('task-item');
		expect((await findAllByTestId('task-item')).length).toBe(1);
	});
});
