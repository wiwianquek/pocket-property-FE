import * as cardAPI from '../api/card';

// export async function fetchOrCreateTodayCard(date) {
//   try {
//     // Try to get today's card
//     const card = await cardAPI.getCardID(date);
//     if (card) {
//       return card;
//     }
//   } catch (error) {
//     // If the card does not exist, create a new one
//     const newCard = await cardAPI.createCardID({ date });
//     return newCard;
//   }
// }
export async function fetchOrCreateTodayCard() {
    try {
      const card = await cardAPI.getCardID();
      if (card && card.length > 0) { // If there's any card returned from the API
        return card[0]; // Assuming you want the first card
      }
    } catch (error) {
      const newCard = await cardAPI.createCardID();
      return newCard;
    }
  }
  