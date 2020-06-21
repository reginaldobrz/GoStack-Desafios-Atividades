import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactiosRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactiosRepository = getCustomRepository(TransactiosRepository);

    const categoryRepository = getRepository(Category);

    const { total } = await transactiosRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance');
    }

    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory);
    }

    const transaction = transactiosRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactiosRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
