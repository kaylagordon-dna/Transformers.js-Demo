import styled from '@emotion/styled';
import './App.css';
import SentimentAnalysis from './components/SentimentAnalysis';
import Ner from './components/Ner';

function App() {
  return (
    <Container>
      <h1>Transformer.JS Demo</h1>
      <SentimentAnalysis />
      <Divider />
      <Ner />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 1250px;
  margin: 0 auto;
`;

const Divider = styled.hr`
  margin: 50px auto;
  border: 1px solid #eee;
  width: 200px;
`;
