import { EmployeeEditView } from 'src/sections/dashboard/employee/view';



// ----------------------------------------------------------------------

export const metadata = {
  title: 'V-Dream Entertainment',
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

