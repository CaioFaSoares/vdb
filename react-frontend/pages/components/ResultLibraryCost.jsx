import React from 'react';

function ResultLibraryCost(props) {
  const imgClass='cost-image-results';
  let imgSrc='';
  if (props.valueBlood) {
    imgSrc=process.env.ROOT_URL + 'images/misc/blood' + props.valueBlood + '.png';
  } else if (props.valuePool){
    imgSrc=process.env.ROOT_URL + 'images/misc/pool' + props.valuePool + '.png';
  }

  return (
    <span className='cost'>
      <img className={imgClass} src={imgSrc} />
    </span>
  );
}

export default ResultLibraryCost;
