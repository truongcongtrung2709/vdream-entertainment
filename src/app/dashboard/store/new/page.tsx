import EmployeeCreateView from 'src/sections/employee/view/employee-create-view';
import { StoreCreateView } from 'src/sections/store/view';
import { UserCreateView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Create a new product',
};

export default function UserCreatePage() {
  return <StoreCreateView />;
}
