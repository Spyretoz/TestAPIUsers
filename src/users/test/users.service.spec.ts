import { Module } from '@nestjs/common';
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { User } from "../user.entity";
import { UsersModule } from '../users.module';
import { UserService } from "../users.service";

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: parseInt('5432'),
          username: 'postgres',
          password: 'password',
          database: 'users',
          entities: [User],
          synchronize: true,
          autoLoadEntities: true
        })],
    //providers: [UserService]
})
class TestModule {}

describe('UsersService', () => {
    // let usersController: UsersController;
    let usersService: UserService;

    // const obj = { id: '90', email: 'test@test.com', username: 'Testaros', password: 'test123', isActive: true, updateAt: new Date('1970-11-16T00:00:00'), createdAt: new Date('1970-11-16T00:00:00') };
    // let myuser : User;
    // myuser = obj;
  
    beforeEach(async () => {        
        const testApp = await NestFactory.createApplicationContext(TestModule);
        usersService = testApp.get<UserService>(UserService);
        // console.log(usersService)
    });    

    // it('should be string', () => {
    //     expect(usersService.findAll()).toBe('haha')
    // })

    it('should be defined', () => {
        expect(usersService.register({ email: 'testaki@test.com', username: 'Testo', password: 't123' })).toBeDefined();
    });

    it('should login a user', () => {
        expect(usersService.login({ username: 'Clin', password: '1234' })).toBeDefined();
    });

    // it('should register user', () => {
    //     expect(usersService.register({ email: 'testaki@test.com', username: 'Testo', password: 't123' })).toEqual({
    //         id: expect.any(String),
    //         email: expect.any(String),
    //         username: expect.any(String),
    //         password: expect.any(String),
    //         isActive: expect.any(Boolean),
    //         updateAt: expect.any(Date),
    //         createdAt: expect.any(Date)
    //     })
    // })


    // test('spyOn .toBeCalled()', () => {
    //     const stub = jest.fn();
    //     console.log(stub);
    //     stub();
    //     expect(stub).toBeCalled();
    // })

    // test('2 spyOn .toBeCalled()', () => {
    //     const somethingspy = jest.spyOn(mockUsersService, 'newf');
    //     console.log(somethingspy);
    //     mockUsersService.newf();
    //     expect(somethingspy).toBeCalled();
    // })


    // test('2 .toBeCalled()', () => {
    //     const somethingspy = jest.spyOn(usersService, 'register');
    //     usersService.register({ email: 'test@test.gr', username: 'Testoto', password: 'test1234' });
    //     //expect(somethingspy).toBeCalled();
    //     expect(somethingspy).toBeDefined();
    // })

    // it('should be something', () => {
    //     const req = new Request('mockUsersService', mockUsersService);
    //     expect(mockUsersService).toBeDefined();
    // })


    // it('should be mock defined', () => {
    //     expect(usersService.register({ email: 'test@test.com', username: 'Testoulis', password: '1234' })).toBeDefined();
    // });

    //     test('then it should call the "register" ', () => {
    //         expect(usersService.register).toBeCalledWith(obj)
    //     })
    // });

    // it('should login a user', () => {
    //     expect(usersService.login({ username: '', password: '' })).toEqual({
    //         some: expect.any(Number)
    //     })
    // });

    // const obj = { email: 'test@test.com', username: 'Testaros', password: 'test123', xamos: 'Egine' };
    // it('should register a user', () => {
    //     expect(usersService.register(obj)).toEqual({
    //         email: expect.any(String),
    //         username: expect.any(String),
    //         password: expect.any(String)
    //     });
    //     //expect(mockUsersService.register).toHaveBeenCalled();
    // });

    // it('should be of UserService Instance', () => {
    //     expect(usersService).toBeInstanceOf(UserService);
    // })

    // const obj = { email: 'test@test.com', username: 'Testaros', password: 'test123' };
    // it('should register a user', () => {
    //     expect(usersService.register(obj)).toEqual({
    //         email: expect.any(String),
    //         username: expect.any(String),
    //         password: expect.any(String)
    //     });
    //     //expect(mockUsersService.register).toHaveBeenCalled();
    // });
});