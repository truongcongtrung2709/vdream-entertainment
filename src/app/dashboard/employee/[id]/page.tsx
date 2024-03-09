import { EmployeeEditView } from 'src/sections/dashboard/employee/view';



// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: User Edit',
};

type Props = {
  params: {
    id: number;
  };
};

export default function UserEditPage({ params }: Props) {
  const { id } = params;

  return <EmployeeEditView id={id} />;
}

