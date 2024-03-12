export interface TrackListProps {
  trackId: number
  trackName: string
  trackRating: number
  explicit: number
  numFavourite: string
  trackShareUrl: string
  primaryGenres: Record<string, any>
  checked?: boolean
}
