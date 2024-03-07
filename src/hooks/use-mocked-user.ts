import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Admin',
    email: 'contact@vdreamentertainment.com',
    password: '123456',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '(+84) 943210566',
    country: 'Việt Nam',
    address: '16C/65/32 An Duong, Yen Phu, Tay Ho, Hanoi',
    state: 'Tay Ho',
    city: 'Ha Noi',
    zipCode: '77000',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
