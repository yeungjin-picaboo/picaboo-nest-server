import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from '../entities/qna.entity';
import { Repository } from 'typeorm';
import { CreateDiaryOutput } from 'src/diary/dtos/create-diary.dto';
import { UpdateQuestionDto } from '../dto/update-diary.dto';

@Injectable()
export class QnaRepository {
  constructor(@InjectRepository(Qna) private readonly QnaRepository: Repository<Qna>) {}

  async getAllQna(page): Promise<Array<Qna>> {
    const qna = await this.QnaRepository.find({
      skip: (page - 1) * 11,
      take: page * 11,
      order: { id: 'ASC' }
    });
    return qna;
  }

  async createQuestion(
    title: string,
    content: string,
    nickname: string,
    isPrivate: boolean
  ): Promise<CreateDiaryOutput> {
    try {
      const result = await this.QnaRepository.save(
        this.QnaRepository.create({
          title,
          content,
          isPrivate,
          nickname
        })
      );
      if (!result) {
        return {
          ok: false,
          error: 'Failed to create Question. Question not found'
        };
      }
      return {
        ok: true,
        message: 'Question successfully created'
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuestion(question_id: number, nickname: string): Promise<string> {
    try {
      const result = await this.QnaRepository.delete({
        id: question_id,
        nickname
      });

      if (result.affected == 1) {
        return '삭제되었습니다';
      } else {
        return '본인 글만 삭제할 수 있습니다.';
      }
    } catch (error) {}
  }
  /**
   * 질문을 보여준다 비밀글일경우 컬럼 조회 후 nickname이 맞는경우 보여줌
   * @param question_id
   * @param nickname
   * @returns question 객체
   */
  async showQuestion(question_id: number, nickname: string) {
    try {
      const question = await this.QnaRepository.findOneBy({
        id: question_id
      });

      if (question.isPrivate && !this.verifyUser(nickname, question.nickname)) {
        // 비밀글일 때
        return '비밀글입니다 본인만 열람 가능합니다.';
      }

      return question;
    } catch (error) {
      console.log('error Is :', error);
      return '해당 글이 존재하지 않습니다';
    }
  }

  /**
   * 작성글 수정한다.
   * @param question_id
   * @param nickname
   * @param updateQuestion
   * @returns
   */
  async updateQuestion(question_id: number, nickname: string, updateQuestion: UpdateQuestionDto) {
    try {
      //
      const result = await this.QnaRepository.update({ id: question_id, nickname }, updateQuestion);

      if (result.affected == 0) {
        return '본인이 작성한 글만 수정할 수 있습니다';
      } else {
        return '수정 성공!';
      }
    } catch (error) {
      return error.message;
    }
  }

  // verify user
  verifyUser(nickname: string, question_nickname: string): boolean {
    if (question_nickname == nickname) {
      return true;
    }
  }
}
