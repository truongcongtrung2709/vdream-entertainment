import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        items: [
          {
            title: 'Giới thiệu',
            path: paths.dashboard.root,
            icon: ICONS.blog,
          },
          {
            title: 'Về chúng tôi',
            path: paths.dashboard.about.root,
            icon: ICONS.blog,
          },
          {
            title: 'Nhân viên',
            path: paths.dashboard.employee.root,
            icon: ICONS.user,
          },
          {
            title: 'Cửa hàng',
            path: paths.dashboard.store.root,
            icon: ICONS.order,
          },
          {
            title: 'Đối tác',
            path: paths.dashboard.collaborator.root,
            icon: ICONS.user,
          },

          {
            title: 'Đổi mật khẩu',
            path: paths.dashboard.changePassword.root,
            icon: ICONS.lock,
          },
        ],
      },
    ],
    []
  );

  return data;
}
