import db from '@/database';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';

export const index = async (req, res) => {
  const query = req.query.query || '';
  const todos = await db.models.todo.findAll({
    where: {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
        author: {
          [Op.iLike]: `%${query}%`,
        },

      },
    },
  });
  return res.json(todos);
};

export const findOne = async (req, res) => {
  const task = await db.models.todo.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.json(task);
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const task = await db.models.todo.create({
    ...req.body,
    isComplete: !!req.body.isComplete,
  }, { fields: ['name', 'description', 'author', 'isComplete'] });
  return res.json(task);
};

export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const task = await db.models.todo.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Not found' });
  }

  const result = await task.update({
    ...req.body,
  }, { fields: ['name', 'description', 'author', 'isComplete'] });

  return res.json(result);
};

export const destroy = async (req, res) => {
  const task = await db.models.todo.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Not found' });
  }

  const result = await task.destroy();

  return res.json(result);
};
