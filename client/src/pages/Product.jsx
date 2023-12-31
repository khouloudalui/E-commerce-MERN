import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import { styled } from "styled-components";
import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "components/Newsletter";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 100px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ paddingTop: "12%" })}
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  margin-right: 5%;

  object-fit: cover;
  ${mobile({ height: "100vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h3`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #008080;
    color: white;
  }
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const Filtersize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FiltersizeOption = styled.option``;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        console.log("getoneprod", res.data);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  return (
    <Container>
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price}$</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                ></FilterColor>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <Filtersize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FiltersizeOption key={s}>{s}</FiltersizeOption>
                ))}
              </Filtersize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <AiOutlineMinus onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <IoAdd onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
          
        </InfoContainer>

      </Wrapper>
      
      <Newsletter />

      <Footer />
    </Container>
  );
};

export default Product;
