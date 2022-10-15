import { InjectModel } from "nestjs-typegoose";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compare, genSalt, hash } from 'bcryptjs';
import { UserModel } from './user.model';
import { UserCreateDto } from './dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './user.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async findUser(login: string) {
    return this.userModel.findOne({ login }).exec();
  }

  async createUser(dto: UserCreateDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      login: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async validateUser(login: string, password: string): Promise<{login: string}> {
    const user = await this.findUser(login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { login: user.login };
  }
}
