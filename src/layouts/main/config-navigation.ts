import { paths } from 'src/routes/paths';


// ----------------------------------------------------------------------
export const pageLinks = [
  {
    order: '1',
    subheader: 'V-DREAM',
    cover: '/assets/images/menu/menu_marketing.jpg',
    items: [
      { title: 'Talents', path: '/' },
      { title: 'Cửa hàng', path: paths.store },
      { title: 'Đối tác', path: paths.collaboration },
      { title: 'Liên hệ', path: paths.contact },
    ],
  },
];

export const navConfig = [
  { title: 'Talents', path: '/' },
  { title: 'Cửa hàng', path: paths.store },
  {
    title: 'Đối tác',
    path: paths.collaboration,
  },
  { title: 'Liên hệ', path: paths.contact },
];
