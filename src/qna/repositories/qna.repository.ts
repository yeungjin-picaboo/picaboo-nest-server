import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { CreateDiaryOutput } from 'src/diary/dtos/create-diary.dto';
import { UpdateQuestionDto } from '../dto/update-diary.dto';

@Injectable()
export class QnaRepository {
  constructor(@InjectRepository(Question) private readonly QnaRepository: Repository<Question>) {}

  // Q&Aの全リストを取得する
  async getAllQna(page): Promise<Array<Question>> {
    const qna = await this.QnaRepository.find({
      skip: (page - 1) * 11,
      take: page * 11,
      order: { id: 'ASC' }
    });
    const test = await this.QnaRepository.find();
    console.log(test);
    console.log(qna);
    return qna;
  }

  // 質問を作成する
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
          error: '質問の作成に失敗しました。質問が見つかりません'
        };
      }
      return {
        ok: true,
        message: '質問が正常に作成されました'
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 質問を削除する
  async deleteQuestion(question_id: number, nickname: string): Promise<string> {
    try {
      const result = await this.QnaRepository.delete({
        id: question_id,
        nickname
      });

      if (result.affected == 1) {
        return '削除されました';
      } else {
        return 'ご自身の投稿だけ削除できます。';
      }
    } catch (error) {}
  }

  // 質問の詳細を表示する
  async showQuestion(question_id: number, nickname: string) {
    try {
      const question = await this.QnaRepository.findOneBy({
        id: question_id
      });

      if (question.isPrivate && !this.verifyUser(nickname, question.nickname)) {
        return '非公開の質問です。本人のみが閲覧できます。';
      }

      return question;
    } catch (error) {
      console.log('error is :', error);
      return '指定された質問が存在しません';
    }
  }

  // 質問を更新する
  async updateQuestion(question_id: number, nickname: string, updateQuestion: UpdateQuestionDto) {
    try {
      const result = await this.QnaRepository.update({ id: question_id, nickname }, updateQuestion);

      if (result.affected == 0) {
        return 'ご自身が投稿した質問のみ更新できます';
      } else {
        return '更新成功!';
      }
    } catch (error) {
      return error.message;
    }
  }

  // ユーザーを検証する
  verifyUser(nickname: string, question_nickname: string): boolean {
    return question_nickname === nickname;
  }
}
