import { makeAutoObservable } from 'mobx';
import { PlaceAutocompletePrediction } from 'types';

class SearchStore {

  private _citiesSearchList: PlaceAutocompletePrediction[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  set citiesSearchList(list: PlaceAutocompletePrediction[]) {
    this._citiesSearchList = list;
  }

  get citiesSearchList() {
    return this._citiesSearchList;
  }
}

const searchStore = new SearchStore();

export { SearchStore, searchStore }