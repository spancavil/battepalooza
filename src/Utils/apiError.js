export const apiErrors = (errorCode) => {
  let errorText = "";

  switch (errorCode) {
    case 2028:
      errorText =
        "Your storage of NFT will exceed the limit. You cannot buy more NFT.";
      break;

    default:
      errorText = "An error occur.";
      break;
  }

  return `${errorText}`;
};
