import { CollaboratorEditView } from 'src/sections/dashboard/collaborator/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'V-Dream Entertainment',
};

type Props = {
  params: {
    id: number;
  };
};

export default function CollaboratorEditPage({ params }: Props) {
  const { id } = params;

  return <CollaboratorEditView id={id} />;
}


