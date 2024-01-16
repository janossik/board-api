import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from '~/roles/roles.decorator';
import { ParsedUtil } from '~/utils/parsed.util';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}
  @Roles(['quest'])
  @Get()
  async findAll() {
    return this.boardService.findAll();
  }
  @Roles(['quest'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boardService.findOne({ id: ParsedUtil.parseID(id) });
  }
  @Roles(['developer'])
  @Post()
  async create(@Body() createBoardDto: Board) {
    return this.boardService.create(createBoardDto);
  }
  @Roles(['leader'])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boardService.update({ id: parseInt(id, 10) }, { deleted: true });
  }

  @Roles(['developer'])
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: Board) {
    return this.boardService.update({ id: ParsedUtil.parseID(id) }, updateBoardDto);
  }
}
