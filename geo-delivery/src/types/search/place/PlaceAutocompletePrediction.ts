import { PlaceAutocompleteMatchedSubstring } from './PlaceAutocompleteMatchedSubstring';
import { PlaceAutocompleteTerm } from './PlaceAutocompleteTerm';
import { PlaceAutocompleteStructuredFormat } from './PlaceAutocompleteStructuredFormat';

export type PlaceAutocompletePrediction = {
  description: string,
  matched_substrings: PlaceAutocompleteMatchedSubstring[],
  place_id: string,
  reference: string,
  structured_formatting: PlaceAutocompleteStructuredFormat,
  terms: PlaceAutocompleteTerm[],
  types: string[],
};