import React from 'react';
import { Popover } from 'react-bootstrap';

function ResultLibraryPopover(props) {
  const cardImage = (
    <img className='card-popover'
         src={'/images/cards/' + props.card['ASCII Name'].toLowerCase().replace(/[\s,:!?'".\-\(\)]/g, '') + '.jpg'}
         alt={props.card['Name']} />
  );

  const sets = Object.keys(props.card['Set']).map((k, index) => {
    return(
      <span className='ml-1' key={index}>
        {k}
      </span>
    );
  });

  return (
    <Popover.Content>
      { props.showImage ?
        <>
          {props.card['Card Text']}
          <div className='popover-sets'>
            {sets}
          </div>
        </>
        :
        cardImage
      }
    </Popover.Content>
  );
}


export default ResultLibraryPopover;
