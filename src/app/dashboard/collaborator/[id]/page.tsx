import { _userList } from 'src/_mock/_user';
import { CollaboratorEditView } from 'src/sections/dashboard/collaborator/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Collaborator Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default function CollaboratorEditPage({ params }: Props) {
  const { id } = params;

  return <CollaboratorEditView id={id} />;
}

export async function generateStaticParams() {
  return _userList.map((user) => ({
    id: user.id,
  }));
}
