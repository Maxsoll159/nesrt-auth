import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ) {

  }



  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userDate } = createUserDto
      const user = this.userRepository.create({
        ...userDate,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)
      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      this.handleDBErros(error)
    }
  }


  async loginUser(createUserDto: LoginUserDto) {
    const { password, email } = createUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    })

    if (!user)
      throw new UnauthorizedException('Credenciales no validas')

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no validas')

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }


  private handleDBErros(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('Please check server log')
  }


  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
