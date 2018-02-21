const expect = require('expect');
const request = require('supertest');

const {app} = require('../server/server');
const {ToDos} = require('../server/models/todos');
const {User} = require('../server/models/users');

beforeEach((done)=>{
    ToDos.remove({}).then(()=>done());
});


describe('POST /todos',()=>{
    it('should create a new Todo',(done)=>{
        var text = 'Test Todo Text';
        request(app).post('/todos').send({text}).expect(200).expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            ToDos.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err)=> done(err));
        });
    });
});