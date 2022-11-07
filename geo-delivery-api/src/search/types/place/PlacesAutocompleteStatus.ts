export enum PlacesAutocompleteStatuses {
  OK='OK',
  ZERO_RESULTS='ZERO_RESULTS',
  INVALID_REQUEST='INVALID_REQUEST',
  OVER_QUERY_LIMIT='OVER_QUERY_LIMIT',
  UNKNOWN_ERROR='UNKNOWN_ERROR',
}

export type PlacesAutocompleteStatus = keyof typeof PlacesAutocompleteStatuses;