import { StoreEditView } from 'src/sections/dashboard/store/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'V-Dream Entertainment',
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


