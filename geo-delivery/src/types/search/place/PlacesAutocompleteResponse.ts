import { PlacesAutocompleteStatus } from './PlacesAutocompleteStatus';
import { PlaceAutocompletePrediction } from './PlaceAutocompletePrediction';

export type PlacesAutocompleteResponse = {
  predictions: PlaceAutocompletePrediction[],
  status: PlacesAutocompleteStatus,
}