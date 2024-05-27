import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from '@emotion/styled';
import { pipeline, env, TokenClassificationOutput } from '@xenova/transformers';

// Setting environment variables to disable local models and browser cache
env.allowLocalModels = false;
env.useBrowserCache = false;

const Ner = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<
    TokenClassificationOutput | TokenClassificationOutput[]
  >([]);
  const [isLoading, setLoading] = useState(false);

  const performNER = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log('Loading NER pipeline...');
      const nerPipeline = await pipeline('ner');
      console.log('Pipeline loaded:', nerPipeline);

      const output = await nerPipeline(text);
      console.log('NER result:', output);

      setResult(output);
    } catch (error) {
      console.error('Error loading pipeline:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={performNER}>
        <Header>2. Named Entity Recognition (NER)</Header>
        <Input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text...'
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </Button>

        {result.length > 0 && !isLoading && (
          <>
            <hr />
            <h2>Result</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </>
        )}
      </Form>
    </>
  );
};

export default Ner;

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
