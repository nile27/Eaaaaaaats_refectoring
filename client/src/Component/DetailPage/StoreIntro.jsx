import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  width: 1200px;
`;

const Image = styled.img`
  width: 1200px;
  height: 223px;
  border-radius: 30px;
  border: 1px solid gray;
  margin-top: 20px;
  object-fit: cover;
`;

const Intro = styled.div`
  margin-top: 20px;
  flex-wrap: wrap;
  font-size: var(--medium-font);
  margin-bottom: 60px;
`;

const StoreIntro = ({ data }) => {
  return (
    <Container>
      <Image src={data.image} />
      <Intro>{data.content}</Intro>
    </Container>
  );
};

export default StoreIntro;
