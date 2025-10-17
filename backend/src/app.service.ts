import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from './prisma/prisma.service';
import { QuizInterface } from './types/quiz.interface';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map(q => ({
            text: q.text,
            type: q.type,
            ...(q.type === 'TEXT'
              ? {}
              : {
                  answers: {
                    create: (q.answers ?? []).map(a => ({
                      text: a.text,
                      isCorrect: a.isCorrect,
                    })),
                  },
                }),
          })),
        },
      },
      select: { id: true, title: true },
    });
  }

async findAll(): Promise<QuizInterface[]> {
  const items = await this.prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      questions: {
        select: {
          id: true,
          text: true,
          type: true,
          answers: {
            select: { text: true, isCorrect: true },
          },
        },
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  });

  return items;
}

  async findOne(id: number): Promise<QuizInterface> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        questions: {
          select: {
            text: true,
            type: true,
            answers: {
              select: { text: true, isCorrect: true },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async remove(id: number) {
    try {
      await this.prisma.quiz.delete({ where: { id } });
      return { success: true };
    } catch {
      throw new NotFoundException('Quiz not found');
    }
  }
}
