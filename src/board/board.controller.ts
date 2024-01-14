import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { ParsedUtil } from '~/utils/parsed.util';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boardService.findOne({ id: ParsedUtil.parseID(id) });
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBoardDto: Board) {
    return this.boardService.create(createBoardDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: Board) {
    return this.boardService.update({ id: ParsedUtil.parseID(id) }, updateBoardDto);
  }
}
