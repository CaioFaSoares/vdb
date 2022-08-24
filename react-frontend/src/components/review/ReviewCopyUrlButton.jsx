import React, { useState } from 'react';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const ReviewCopyUrlButton = ({ deckid, urlDiff }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [state, setState] = useState(false);

  const handleStandardButton = () => {
    const deckUrl = `${process.env.ROOT_URL}review?id=${deckid}#${urlDiff}`;

    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  return (
    <ButtonIconed
      variant={state ? 'success' : 'secondary'}
      onClick={handleStandardButton}
      title="Copy URL"
      icon={<Link45Deg width="19" height="19" viewBox="0 0 15 15" />}
      text={state ? 'Copied' : 'Copy URL'}
    />
  );
};

export default ReviewCopyUrlButton;
