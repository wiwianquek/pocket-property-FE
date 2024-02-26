import * as resaleDataAPI from '../api/resaledata';

export async function fetchResaleDataForUser() {
  return await resaleDataAPI.getResaleDataForUser();
}

export async function performResaleDataSearch(queryParams) {
  return await resaleDataAPI.searchResaleData(queryParams);
}

export async function removeResaleDataEntry(entryId) {
  return await resaleDataAPI.deleteResaleDataEntry(entryId);
}
