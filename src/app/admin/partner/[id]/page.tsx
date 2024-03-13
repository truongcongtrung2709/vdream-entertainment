import { CollaboratorEditView } from 'src/sections/dashboard/collaborator/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Collaborator Edit',
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


