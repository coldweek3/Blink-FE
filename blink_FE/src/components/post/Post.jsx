//Post.jsx
// #1 메인 - 글쓰기 페이지 총괄
import React, { useState } from "react";
import styled from "styled-components";
import AdrSearch from "./AdrSearch";
import { StyledSearchResult, SearchResultInputs } from "./SearchResult";
import Calendartwo from "./DatePicker";

const AdrSearchContainer = styled.div`
  position: absolute;
  top: 480px;
  left: 30%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: white;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const PostContainer = styled.div`
  width: 1030px;
  height: 860px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 20px;
`;

const TopRow = styled.div`
  display: flex;
  width: 958px;
  justify-content: space-between;
`;

const Search = styled.div`
  height: 56px;
  width: 660px;
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Lsquare = styled.div`
  margin-bottom: 30px;
`;

const SquareBox = styled.div`
  width: 958px;
  height: 371px;
  border-radius: 10px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

const Display = styled.div`
  display: flex;
`;

const SquareBox2 = styled(SquareBox)`
  height: 250px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Label = styled.label`
  background-color: black;
`;

const Select = styled.select`
  width: 151px;
  height: 40px;
  padding: 5px;
`;

const TitleInput = styled.input`
  width: 600px;
  height: 50px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  resize: none;
`;

const Search2 = styled(Search)`
  width: 295px;
  margin-left: 30px;
  cursor: pointer;
`;

export default function Post() {
  const [showAdrSearch, setShowAdrSearch] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    postcode: "",
    address: "",
    // ... other fields
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const toggleAdrSearch = () => {
    setShowAdrSearch(!showAdrSearch);
    setShowDatePicker(false); // Hide the date picker when toggling AdrSearch
  };

  const handleDatePickerSelect = (date) => {
    setSelectedDate(date); // Update the selected date
    setShowDatePicker(false); // Hide the date picker
  };

  return (
    <>
      <PostContainer>
        <TopRow>
        <div onClick={toggleAdrSearch}>Click here to show AdrSearch</div>
          <Search2 onClick={() => setShowDatePicker(!showDatePicker)}>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}
          </Search2>
        </TopRow>
        <AdrSearchContainer show={showAdrSearch || showDatePicker}>
          {showAdrSearch ? (
            <AdrSearch onUpdateAddress={setAddressInfo} showAdrSearch={showAdrSearch} />
          ) : (
            showDatePicker && <Calendartwo onSelectDate={handleDatePickerSelect} />
          )}
        </AdrSearchContainer>


        {showAdrSearch && (
          <StyledSearchResult>
            <SearchResultInputs
              {...addressInfo}
              handleDetailAddressChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  detailAddress: e.target.value,
                })
              }
            />
          </StyledSearchResult>
        )}
        <Lsquare>
          <SquareBox>
            <Display>
              <FormRow>
                <TitleInput type="text" placeholder="Enter a title" />
              </FormRow>
              <FormRow>
                <Select>
                  <option value="Traffic Accident">Traffic Accident</option>
                  <option value="Theft">Theft</option>
                  <option value="Report Missing">Report Missing</option>
                  <option value="Other">Other</option>
                </Select>
              </FormRow>
            </Display>
            <FormRow>
              <TextArea rows="10" placeholder="Enter your content" />
            </FormRow>
          </SquareBox>
        </Lsquare>
        <SquareBox2>Omg</SquareBox2>
      </PostContainer>
    </>
  );
}
