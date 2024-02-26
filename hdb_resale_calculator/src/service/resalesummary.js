import * as resaleSummaryAPI from '../api/resalesummary';

export async function saveSearchSummary(summaryData) {
  return await resaleSummaryAPI.saveSearchSummary(summaryData);
}

export async function getSearchSummaryByUserId(queryParams) {
  return await resaleSummaryAPI.getSearchSummaryByUserId(queryParams);
}

export async function deleteSearchSummary(entryId) {
  return await resaleSummaryAPI.deleteSearchSummary(entryId);
}

