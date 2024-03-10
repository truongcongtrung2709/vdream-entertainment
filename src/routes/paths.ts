const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  collaboration: '/collaboration',
  store: '/store',
  contact: '/contact',
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    about: {
      root: `${ROOTS.DASHBOARD}/about-us`,
    },
    employee: {
      root: `${ROOTS.DASHBOARD}/employee`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/employee/${id}`,
      new: `${ROOTS.DASHBOARD}/employee/new`,
    },
    store: {
      root: `${ROOTS.DASHBOARD}/store`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/store/${id}`,
      new: `${ROOTS.DASHBOARD}/store/new`,
    },
    collaborator: {
      root: `${ROOTS.DASHBOARD}/collaborator`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/collaborator/${id}`,
      new: `${ROOTS.DASHBOARD}/collaborator/new`,
    },
    changePassword: {
      root: `${ROOTS.DASHBOARD}/change-password`,
    },
  },
};
