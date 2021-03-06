import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

jest.mock('got');

const GRAPHQL_ENDPOINT = '/grqphql'

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () =>{
    await getConnection().dropDatabase()
    app.close();
  })

describe('createAccount', () => {
  const EMAIL = "Hun@wow.com";
  it('should create account', () => {
    return request(app.getHttpServer()).post(GRAPHQL_ENDPOINT).send({
      query: `mutation{
        createAccount(input:{
          email:"${EMAIL}",
          password:"1234",
          role:Owner
        }){
          ok
          error
        }
      }`,
    }).expect(200)
    .expect(res => {
      expect(res.body.data.createAccount.ok).toBe(true);
      expect(res.body.data.createAccount.error).toBe(null);
    });
});

it.todo('should fail if account already exists', ()=>{
  return request(app.getHttpServer()).post(GRAPHQL_ENDPOINT).send({
    query:`mutation{
      createAccount(input:{
        email: "${EMAIL},
        password: "12345",
        role: Owner
      }){
        ok
        error
      }
    }`,
  }).expect(200).expect(res => {expect(res.body.data.createAccount.ok).toBe(true);
    expect(res.body.data.createAccount.error).toBe('This is a user with that email already');
  })
});
});


it.todo('userProfile');
it.todo('login');
it.todo('me');
it.todo('verifyEmail');
it.todo('editProfile');
});
