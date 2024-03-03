import EmployeeCreateView from 'src/sections/employee/view/employee-create-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Create a new user',
};

export default function UserCreatePage() {
  return <EmployeeCreateView />;
}
