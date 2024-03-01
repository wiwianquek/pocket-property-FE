import * as cardAPI from '../api/card';

export async function fetchOrCreateTodayCard() {
    try {
      const card = await cardAPI.getCardID();
      if (card && card.length > 0) { // if there's any card returned from the API
        return card[0]; //to get the first card
      }
    } catch (error) {
      const newCard = await cardAPI.createCardID();
      return newCard;
    }
  }
  