import ILogin from '../../interfaces/ILogin.interface';
import IUser from '../../interfaces/IUser.interface';

const loginMock: ILogin = {
  email: 'user@user.com',
  password: 'secret_user'
}

const userMock: IUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const incorrectLoginMock = {
  email: null,
  password: 'secret_user'

}

const teamsMock = {
  id: 1,
	teamName: 'Avaí/Kindermann'
}

export { 
  loginMock, 
  userMock, 
  incorrectLoginMock, 
  teamsMock 
};
