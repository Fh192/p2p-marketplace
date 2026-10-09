export enum ListingStatus {
  Draft = 'DRAFT',
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Sold = 'SOLD'
}

export type Actor = 'system' | 'seller';

type TransitionMap = Record<ListingStatus, readonly ListingStatus[]>;

export const LISTING_TRANSITIONS: Record<Actor, TransitionMap> = {
  system: {
    [ListingStatus.Draft]: [],
    [ListingStatus.Active]: [ListingStatus.Sold],
    [ListingStatus.Archived]: [],
    [ListingStatus.Sold]: [ListingStatus.Active],
  },
  seller: {
    [ListingStatus.Draft]: [ListingStatus.Active],
    [ListingStatus.Active]: [ListingStatus.Archived],
    [ListingStatus.Archived]: [ListingStatus.Active],
    [ListingStatus.Sold]: []
  },
};

export function canTransitionListingStatus(
  actor: Actor,
  { from, to }: { from: ListingStatus; to: ListingStatus }
): boolean {
  const allowed = LISTING_TRANSITIONS[actor][from];
  return allowed.includes(to);
}
