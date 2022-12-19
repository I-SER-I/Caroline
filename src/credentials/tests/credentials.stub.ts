import { Credential } from '@prisma/client';

export const credentialsStub: Credential[] = [
  {
    id: 1,
    userId: '58127a91-ef2e-4d03-b429-bb896fa141b5',
    config: {
      apiKey: '327623074677e6ee123321c6748a34a1',
      oAuthToken:
        'b286067c2a22027a990139708a8f72713049d9383fcfaab0dc40042de5de9612',
    },
    apiService: 'trello',
  },
  {
    id: 2,
    userId: 'b9b2b2b9-2b2b-2b2b-2b2b-2b2b2b2b2b2b',
    config: {
      apiKey: '312345678901e6ee555827c67a8b34c4',
      oAuthToken:
        'b246067c2a22027a9901332748a8f72713049d9383fcfaab0dc40042de5de9023',
    },
    apiService: 'trello',
  },
  {
    id: 3,
    userId: 'b9b2b2b9-2b2b-2b2b-2b2b-2b2b2b2b2b2b',
    config: {
      baseUrl: 'http://example.myjetbrains.com',
      token: 'perm:your-token',
    },
    apiService: 'youtrack',
  },
];
