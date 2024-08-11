import { LinkType } from '@/lib/types/type';
import { ClientDraggableLinkList } from './ClientLinkList';
import { updateLinkOrder,updateLink, deleteLink, updateLinkVisibility } from '@/app/edit/actions';

interface DragLinksProps {
  links: LinkType[];
}
// As a SERVER Wrapper for ServerComponents
export function DragLinks({ links }: DragLinksProps) {
  return (
    <ClientDraggableLinkList
      links={links}
      updateLinkOrder={updateLinkOrder}
      updateLink={updateLink}
      deleteLink={deleteLink}
      updateLinkVisibility={updateLinkVisibility}
    />
  );
}