import { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

const AddMenuWrap = styled.div`
  width: calc(50% - 25px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  > label > span {
    font-size: 1.2rem;
  }
  button {
    background-color: transparent;
    svg {
      width: 30px;
      height: 30px;
      color: var(--black-350);
      :hover {
        color: var(--eatsgreen);
      }
    }
  }
`;

const AddMenuInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;

  .addMenuItem {
    width: 70%;
    padding: 20px;
    border: 1px solid #ddd;
    font-size: var(--medium-font);
  }
  .addMenuPrice {
    width: 30%;
    padding: 20px;
    border: 1px solid #ddd;
    font-size: var(--medium-font);
    margin-right: 10px;
    text-align: right;
    border-left: none;
  }
`;
const MenuInput = styled.input`
  width: 70%;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ddd;
  font-size: var(--medium-font);
  margin-top: 5px;
  margin-bottom: 10px;
`;

const PriceInput = styled(MenuInput)`
  width: 30%;
  margin-right: 10px;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const AddMenu = ({ formData, setFormData }) => {
  const [menuList, setMenuList] = useState(formData.menuList || []);
  useEffect(() => {
    setMenuList(formData.menuList);
  }, [formData.menuList]);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onAddMenu = () => {
    const { menu, price, ...rest } = formData;
    if (!menu || !price) return;
    const updatedMenuList = [...menuList, { menu, price }];
    setMenuList(updatedMenuList);
    setFormData({
      ...rest,
      menuList: updatedMenuList,
    });
  };

  const onDeleteMenu = (index) => {
    setMenuList(menuList.filter((item, idx) => idx !== index));
  };

  return (
    <AddMenuWrap>
      <label htmlFor="menuPirce">
        메뉴 및 가격<span> (가격은 숫자만 입력가능합니다.)</span>
      </label>
      <AddMenuInput id="menuPirce">
        <MenuInput
          name="menu"
          value={formData.menu || ""}
          onChange={onInputChange}
          type="text"
          placeholder="메뉴를 입력하세요"
          maxLength="100"
        />
        <PriceInput
          name="price"
          value={formData.price || ""}
          onChange={onInputChange}
          type="number"
          placeholder="가격을 입력하세요"
          maxLength="10"
          min="0"
        />
        <button onClick={onAddMenu}>
          <MdAddCircleOutline />
        </button>
      </AddMenuInput>
      {menuList.map((item, index) => (
        <Menu key={index}>
          <span className="addMenuItem">{item.menu}</span>
          <span className="addMenuPrice">{item.price}원</span>
          <button onClick={() => onDeleteMenu(index)}>
            <MdRemoveCircleOutline />
          </button>
        </Menu>
      ))}
    </AddMenuWrap>
  );
};

export default AddMenu;
