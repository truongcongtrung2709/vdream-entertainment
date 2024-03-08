import { StoreEditView } from 'src/sections/dashboard/store/view';
import axios, { endpoints } from 'src/utils/axios';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default function StoreEditPage({ params }: Props) {
  const { id } = params;

  return <StoreEditView id={id} />;
}


