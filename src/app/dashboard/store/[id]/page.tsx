import axios, { endpoints } from 'src/utils/axios';

import { StoreEditView } from 'src/sections/store/view';

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

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product: { id: string }) => ({
    id: product.id,
  }));
}
