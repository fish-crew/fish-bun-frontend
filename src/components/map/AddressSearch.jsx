import { useDaumPostcodePopup } from "react-daum-postcode";

const AddressSearch = ({ setAddress }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
  };

  const openPostcode = useDaumPostcodePopup();

  return (
    <button
      type="button"
      className="bg-blue-500 rounded-md py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-600 ml-2"
      onClick={() =>
        openPostcode({
          onComplete: handleComplete,
          popupTitle: "붕어빵 가게 주소 찾기",
        })
      }
    >
      검색
    </button>
  );
};

export default AddressSearch;
