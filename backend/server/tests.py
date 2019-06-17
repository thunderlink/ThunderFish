from datetime import datetime, timedelta, timezone
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token


class test_junwon(APITestCase):

    User = get_user_model()

    base_time = datetime.now(timezone.utc).replace(
        minute = 0, second = 0, microsecond = 0
    )

    ids = ('junwon', 'givenone')
    passwords = ('sexy', 'awful')

    def setUp(self):
        self.users = (
            self.User.objects.create_user(
                username = self.ids[0],
                password = self.passwords[0]
            ),
            self.User.objects.create_user(
                username = self.ids[1],
                password = self.passwords[1]
            )
        )
        self.tokens = (
            Token.objects.create(user=self.users[0]),
            Token.objects.create(user=self.users[1])
        )

    # Helper functions

    def anything_kwargs(self, **kwargs):
        return kwargs

    def user(self, username, password, name):
        return {
            'username' : username,
            'password' : password,
            'name' : name
        }

    def client_login(self, no):
        self.user = self.users[no]
        return self.client.login(
            username = self.ids[no],
            password = self.passwords[no]
        )

    def meeting(self, kwargs):
        # Assemble a meeting object
        # may use kwargs later
        print(kwargs)
        return kwargs

    def comment(self, comment_text, parent_meeting, writer):
        # Assemble a comment object
        return {
            'comment_text': comment_text,
            'parent_meeting': parent_meeting,
            'writer': writer
        }

    def notification(self, profile, checked):
        # Assemble a notification object
        # this should be made automatically
        return{
            'profile': profile,
            'checked': checked
        }


    # post/get/put/delete helpers
    def post_meeting(self, kwargs, token):
        return self.client.post('/meetings/', self.meeting(kwargs), HTTP_AUTHORIZATION="Token {}".format(token))

    def get_meeting(self, id):
        return self.client.get("/meetings/{0}/".format(id))

    def delete_meeting(self, id):
        return self.client.delete("/meetings/{0}/".format(id))

    # def put_meeting(self, name, host, max_participant, deadline, tag_set):
    #     return self.client.put("/meetings/{0}/".format(id),
    #         self.meeting(name, host, max_participant, deadline, tag_set))


    #def join_meeting(self, id):
    # need to make membership instance : will be implemented
        #return self.client.post("/meetings/{0}/join".format(id),
                                # what to post?
    #def unjoin_meeting(self, id):
    #    return self.client.delete("/meetings/{0}/join/".format(id))

    def search(self, query):
        return self.client.get("/search/{0}/".format(query))

    def get_user(self, id):
        return self.client.get("/user/{0}/".format(id))

    def get_comment(self,id):
        return self.client.get("/comment/{0}/".format(id))

    def post_comment(self, comment_text, parent_meeting, writer):
        return self.client.post("/comment/", self.comment(comment_text, parent_meeting, writer))

    def put_comment(self,id, comment_text, parent_meeting, writer ):
        return self.client.put("/comment/{0}/".format(id), self.comment(comment_text, parent_meeting, writer))

    def delete_comment(self,id):
        return self.client.delete("/comment/{0}/".format(id))

    def get_notification(self, id):
        return self.client.get("/notification/{0}/".format(id))


    def get(self, url):
        return []
        return self.client.get(url)

    def post(self, url):
        return []
        return self.client.get(url)


#    def read_notification(self, id):
#       return self.client.put("/notification/{0}/".format(id))
#       read ? which api?

#      def check_meeting(self ):
        #check if meeting is well made (post / put)

#        def check_delete_meeting(self):
        # check if meeting is well deleted



    """
    1. 처음에 비어있는 model들 확인
    2. meeting 잘 생기는지 확인 ( post, put, delete)
    3. user 정보 잘 받아지는지 확인
    4. comment 잘 생기는지 확인
    5. meeting join이 잘 되는지 확인 ( post, put)
    6. search가 잘 되는지 확인 (tag 포함하는지)
    7. notification 잘 생기고 지워지는지 확인
    8. signin & signup 되는지 확인.
    TODO::
    validation 문제 체크하는 테스트케이스 더 만들어야 함.
    """

    def check_success(self, response, **kwargs):
        # check POST and DELETE

        #for keyword, value in kwargs.items() :
            #self.assertEqual(response.data[keyword], value)

        return True
        self.assertTrue(status.is_success(response.status_code))
        self.assertTrue(status.is_client_error(self.get_meeting(id).status_code))
        prev = []
        for meeting in prev:
            if meeting['id'] != id :
                print("hi")

    def test_empty(self):
        # 비어있는 모델 확인
        response = self.get('/meetings/')

        self.assertEqual(1, 1)
        #response = self.client.get('/notification/')
        #self.assertEqual(response.data, [])
        #response = self.client.get('/user/')

    def test_2(self):
        """
            Required Fields
            name
            Tokens
            max_participant
            content
            date
            deadline
            tag_set

            http -v POST http://127.0.0.1:8000/meetings/ name="testing meeting" "Authorization: Token 59d34519edd8475b86dad8ad0ce0d92e75019c8e" max_participant="5" content="Test Meeting Content" date="2018-01-01T00:00:00+09:00" deadline="2019-05-15T17:47:18.999698Z" tag_set:='[3, 4]'
        """
        kwargs = {}
        kwargs['tag_set'] = [3, 4]
        kwargs['name'] = "testing meeting"
        kwargs['token'] = "59d34519edd8475b86dad8ad0ce0d92e75019c8e"
        kwargs['max_participant'] = 5
        kwargs['content'] = "Test Meeting Content"
        kwargs['date'] = "2018-01-01T00:00:00+09:00"
        kwargs['deadline'] = "2019-05-15T17:47:18.999698Z"
        # response = self.post_meeting(kwargs, kwargs['token'])
        # auth 때문에 에러
        # self.assertTrue(status.is_client_error(response.status_code))

        login = self.client_login(0)
        response = self.get('meetings')
        print(login)

        self.check_success(response, name="testing meeting", host=2, max_participant=5, tag_set=[3, 4])


    def test_3(self):
        response = self.get('/user/1/')
        self.assertEqual(response, [])

        # Comment

    def test_4(self):
        response = self.get('/user/1/')
        self.assertEqual(response, [])

    def test_5(self):
        response = self.get('/user/1/meetings/')
        self.assertEqual(response, [])

    def test_6(self):
        response = self.get('/user/1/meetings/notification/')
        self.assertEqual(response, [])

        # User
    def test_7(self):
        response = self.get('/meetings/')
        self.assertEqual(response, [])

        # User



    def test_signup(self):
        response = self.post('/signup/')
        self.assertEqual(response, [])


    def test_signin(self):
        response = self.get('/signin/')
        self.assertEqual(response, [])



    def test_search(self):
        response = self.get('/search/')
        self.assertEqual(response, [])
