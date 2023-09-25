import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
	) {}
	signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.createUser(authCredentialsDto);
	}
	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
		const { password, username } = authCredentialsDto;
		const user = await this.userRepository.findOne({
			where: {
				username,
			},
		});
		if (user && (await bcrypt.compare(password, user.password))) {
			return 'success';
		} else {
			throw new UnauthorizedException(
				'Please check you login credentials',
			);
		}
	}
}
