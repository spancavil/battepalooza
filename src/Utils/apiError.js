export const apiErrors = (errorCode) => {
  let errorText = "";

  switch (errorCode) {
    case 2030:
      errorText = "NFT item is in deal by another user.";
      break;

    case 2028:
      errorText =
        "Your storage of NFT will exceed the limit. You cannot buy more NFT.";
      break;

    case 2021:
      errorText = "NFT item not found.";
      break;

    case 2020:
      errorText = "The NFT item is being used in the game.";
      break;

    case 2007:
      errorText = "NFT item is already in the marketplace.";
      break;

    case 2004:
      errorText = "NFT item is already sold.";
      break;

    case 2001:
      errorText = "Price should be much more than limit";
      break;

    case 2000:
      errorText = "Forte network error.";
      break;

    case 504:
      errorText = "Not enough ncoin.";
      break;

    case 201:
      errorText = "The server is under maintenance.";
      break;

    default:
      errorText = "An error occur.";
      break;
  }

  return `${errorText} Please try again later.`;
};
