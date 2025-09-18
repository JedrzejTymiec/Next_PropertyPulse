import { type Entity } from '@/constants/Entity';

export const confirmDelete = (entity: Entity) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete this ${entity.toLocaleLowerCase()}`,
  );
  if (!confirmed) return;
};
