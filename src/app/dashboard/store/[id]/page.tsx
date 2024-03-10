import { StoreEditView } from 'src/sections/dashboard/store/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product Edit',
};

type Props = {
  params: {
    id: number;
  };
};

export default function StoreEditPage({ params }: Props) {
  const { id } = params;

  return <StoreEditView id={id} />;
}


