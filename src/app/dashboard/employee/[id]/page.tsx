import { _userList } from 'src/_mock/_user';
import { EmployeeEditView } from 'src/sections/dashboard/employee/view';



// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default function UserEditPage({ params }: Props) {
  const { id } = params;

  return <EmployeeEditView id={id} />;
}

export async function generateStaticParams() {
  return _userList.map((user) => ({
    id: user.id,
  }));
}
