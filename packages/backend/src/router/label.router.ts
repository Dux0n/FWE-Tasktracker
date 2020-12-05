import { Router } from 'express';
import {
	createLabel,
	deleteLabelById,
	getAllLabels,
	getAllTasksOfLabel,
	getLabelById,
	updateLabelById,
} from '../controller/label.controller';

export const labelRouter = Router({ mergeParams: true });

labelRouter.get('/', getAllLabels);

labelRouter.post('/', createLabel);

labelRouter.get('/:labelId/tasks', getAllTasksOfLabel);

labelRouter.get('/:labelId', getLabelById);

labelRouter.delete('/:labelId', deleteLabelById);

labelRouter.patch('/:labelId', updateLabelById);
