import React, { useEffect, useState } from 'react';

interface Exchange {
  type: 'input' | 'output' | 'date';
  content: string;
}

const ModelExample = ({ exchanges }: { exchanges: Exchange[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="imessage">
      {exchanges.map((exchange, index) => {
        if (exchange.type === 'date') {
          return (
            <div key={index} className="date-container">
              <span className="date-heading">{exchange.content}</span>
            </div>
          );
        }
        return (
          <p key={index} className={exchange.type === 'input' ? 'from-them' : 'from-me'}>
            <span dangerouslySetInnerHTML={{ __html: exchange.content }} />
          </p>
        );
      })}
    </div>
  );
};

export default ModelExample;