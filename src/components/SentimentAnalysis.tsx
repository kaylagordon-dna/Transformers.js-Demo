import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from '@emotion/styled';
import {
  TextClassificationOutput,
  pipeline,
  env,
  TextClassificationSingle,
} from '@xenova/transformers';

const SentimentAnalysis = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<
    TextClassificationOutput | TextClassificationOutput[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Setting environment variables to disable local models and browser cache
  env.allowLocalModels = false;
  env.useBrowserCache = false;

  const classifyText = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const sentimentPipeline = await pipeline('sentiment-analysis');
      const output = await sentimentPipeline(text);
      setResult(output);
    } catch (error) {
      console.error('Classification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={classifyText}>
        <Header>1. Sentiment Analysis</Header>
        <Input
          type='text'
          onChange={(event) => setText(event.target.value)}
          placeholder='Enter text...'
          value={text}
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </Button>
        {result.length > 0 && !isLoading && (
          <>
            <hr />
            <h2>Result</h2>
            {result.map((item, index) => (
              <div key={index}>
                <h4>
                  <u>Sentiment:</u> {(item as TextClassificationSingle).label}
                </h4>
                <h4>
                  <u>Score:</u> {(item as TextClassificationSingle).score}
                </h4>
              </div>
            ))}
          </>
        )}
      </Form>
    </>
  );
};

export default SentimentAnalysis;

const Header = styled.h2`
  text-align: left;
  margin-top: 50px;
`;

const Form = styled.form`
  width: 650px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
