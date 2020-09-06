import React from 'react';

function ResultCryptClan(props) {
  const imgClass='clan-image-results';
  const imgSrc=process.env.ROOT_URL + 'images/clans/' + props.value.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';

  return (
    <td className='clan'>
      <img className={imgClass} src={imgSrc} />
    </td>
  );
}

export default ResultCryptClan;
