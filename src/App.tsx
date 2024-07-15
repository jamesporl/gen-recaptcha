import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { Box, Button, CopyButton, Text } from '@mantine/core';

function App() {
  const [token, setToken] = useState('');
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const executeRecaptcha = () => {
    window.grecaptcha.ready(() => {
      setRecaptchaReady(true);
    });
  }

  const generateToken = async () => {
    const newToken = await window.grecaptcha.execute(import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT_KEY); 
    setToken(newToken);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT_KEY}`;
    script.addEventListener('load', executeRecaptcha);
    document.body.appendChild(script);
  }, []);

  const handleGenerateToken = useCallback(() => {
    if (recaptchaReady) {
      setToken('');
      generateToken();
    }
  }, [recaptchaReady])

  let tokenComp: ReactNode = null;
  if (token) {
    tokenComp = (
      <Box mt={8} w={200}>
        <Text fz="xs">{`${token.slice(0, 50)}...`}</Text>
        <CopyButton value={token} timeout={2000}>
            {({ copy }) => (
              <Button onClick={copy} variant="outline" mt={8}>
                Copy
              </Button>
            )}
         </CopyButton>
      </Box>
    );
  }

  return (
    <Box m={16}>
      <Button onClick={handleGenerateToken}>Generate token</Button>
      {tokenComp}
    </Box>
  );
}

export default App;
