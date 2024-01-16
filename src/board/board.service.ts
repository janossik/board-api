import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  findOne(where: FindOptionsWhere<Board>): Promise<Board> {
    return this.boardRepository.findOneBy(where);
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }

  create(board: Omit<Board, 'id'>): Promise<Board> {
    return this.boardRepository.save(board);
  }

  async update(where: FindOptionsWhere<Board>, board: Partial<Omit<Board, 'id'>>): Promise<Board> {
    const toUpdate = await this.boardRepository.findOneBy(where);
    const updated = Object.assign(toUpdate, board);
    return this.boardRepository.save(updated);
  }
}
